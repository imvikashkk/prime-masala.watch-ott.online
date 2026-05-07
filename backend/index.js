import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import os from 'node:os';
import crypto from 'crypto';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8081;

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'watchott',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => console.log('PostgreSQL connected'));
pool.on('error', (error) =>
  console.error('PostgreSQL connection error:', error.message),
);

app.get('/', (req, res) => res.send('Hello, World!'));

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 'error',
        database: 'disconnected',
        message: error.message,
      });
  }
});

function generateToken(fbclid) {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) throw new Error('TOKEN_SECRET missing in environment');
  return crypto.createHmac('sha256', secret).update(fbclid).digest('hex');
}

// ─────────────────────────────────────────────
//  POST /start-session
//  Body: { fbclid }
// ─────────────────────────────────────────────
app.post('/start-session', async (req, res) => {
  const { fbclid } = req.body;

  if (!fbclid) {
    return res
      .status(400)
      .json({ status: 'error', message: 'fbclid is required' });
  }

  try {
    const token = generateToken(fbclid);

    await pool.query(
      'INSERT INTO sessions (fbclid, status, token) VALUES ($1, $2, $3)',
      [fbclid, 'pending', token],
    );

    return res.json({ status: 'success', fbclid, token });
  } catch (error) {
    if (error.code === '23505') {
      // Already exists — pending hai to purana token wapas bhej do
      const existing = await pool.query(
        'SELECT fbclid, token, status FROM sessions WHERE fbclid = $1',
        [fbclid],
      );
      const row = existing.rows[0];

      if (row.status === 'pending') {
        return res.json({
          status: 'success',
          fbclid: row.fbclid,
          token: row.token,
        });
      }

      // Already done hai
      return res
        .status(409)
        .json({ status: 'error', message: 'Already processed' });
    }
    return res
      .status(500)
      .json({
        status: 'error',
        message: 'Failed to save session',
        error: error.message,
      });
  }
});

// ─────────────────────────────────────────────
//  POST /success-session
//  Body: { fbclid, token, price? }
// ─────────────────────────────────────────────
app.post('/success-session', async (req, res) => {
  const { fbclid, token, price } = req.body;
  const client = await pool.connect();

  try {
    if (!fbclid || !token) {
      return res
        .status(400)
        .json({ status: 'error', message: 'fbclid and token required' });
    }

    await client.query('BEGIN');

    const sessionResult = await client.query(
      'SELECT * FROM sessions WHERE fbclid = $1 FOR UPDATE',
      [fbclid],
    );

    if (sessionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid or expired session' });
    }

    const session = sessionResult.rows[0];

    if (session.status === 'done') {
      await client.query('ROLLBACK');
      return res
        .status(400)
        .json({ status: 'error', message: 'Already processed' });
    }

    const expectedToken = generateToken(fbclid);
    if (token !== session.token || token !== expectedToken) {
      await client.query('ROLLBACK');
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid token' });
    }

    const updateResult = await client.query(
      `UPDATE sessions
       SET status = $1, updated_at = CURRENT_TIMESTAMP, processed_at = CURRENT_TIMESTAMP, price = $2
       WHERE fbclid = $3
       RETURNING *`,
      ['done', price || null, fbclid],
    );

    const updatedSession = updateResult.rows[0];

    // ─── META CAPI ────────────────────────────────────────────
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_PIXEL_ACCESS_TOKEN;

    if (!pixelId || !accessToken)
      throw new Error('META pixel configuration missing in environment');

    const timestamp = Math.floor(Date.now() / 1000);
    const eventId = crypto.randomUUID();

    const serverUserData = {
      client_ip_address: req.ip,
      client_user_agent: req.headers['user-agent'],
      fbc: `fb.1.${timestamp}.${updatedSession.fbclid}`,
    };

    const capiPayload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: timestamp,
          event_id: eventId,
          action_source: 'website',
          user_data: serverUserData,
          ...(price && {
            custom_data: {
              currency: process.env.CURRENCY || 'INR',
              value: String(price),
            },
          }),
        },
      ],
    };

    try {
      const capiRes = await fetch(
        `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiPayload),
        },
      );
      if (!capiRes.ok)
        console.error('CAPI non-2xx:', capiRes.status, await capiRes.text());
    } catch (err) {
      console.error('CAPI fetch error:', err.message);
    }

    await client.query('COMMIT');

    return res.json({
      status: 'success',
      valid: true,
      eventId,
      fbclid,
      pixelId,
    });
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    return res
      .status(500)
      .json({
        status: 'error',
        message: 'Verification failed',
        error: error.message,
      });
  } finally {
    client.release();
  }
});

const getPublicIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    if (!interfaces[name]) continue;
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  throw new Error('No public IP address found');
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = await fs.readFile(schemaPath, 'utf8');
    await pool.query(schemaSql);
    console.log('Database schema ensured');

    const server = app.listen(PORT, () => {
      console.log(`👷 Worker PID:${process.pid} running on port ${PORT}`);
      console.info(`  ➡️  http://localhost:${PORT}`);
      console.info(`  ➡️  http://${getPublicIP()}:${PORT}\n`);
    });

    const shutdown = async () => {
      console.log('Shutting down...');
      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
