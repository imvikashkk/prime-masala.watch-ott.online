# API Watchott Setup Guide

## Migration from Redis to PostgreSQL

This application has been migrated from Redis to PostgreSQL for better session persistence and history tracking.

### Benefits:

✅ Sessions are **never deleted** - complete audit trail maintained
✅ No duplication issues - atomic transactions with row-level locks
✅ Better for production deployments
✅ Full history of all verifications in `verification_logs` table

### Prerequisites

1. **PostgreSQL installed** (version 12+)
2. **Node.js** installed

### Setup Steps

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE watchott;

# Switch to the database
\c watchott

# Run the schema file
\i schema.sql
```

Or run it directly:

```bash
psql -U postgres -d watchott -f schema.sql
```

#### 3. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
PORT=8081
TOKEN_SECRET=your-secret-key-here

DB_HOST=localhost
DB_PORT=5432
DB_NAME=watchott
DB_USER=postgres
DB_PASSWORD=postgres

META_PIXEL_ID=your-pixel-id
META_ACCESS_TOKEN=your-access-token
```

#### 4. Start the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

### API Endpoints

#### POST `/save-session`

Save a new session with fbclid

Request:

```json
{
  "sessionID": "unique-session-id",
  "fbclid": "facebook-click-id"
}
```

#### POST `/verify-session`

Verify and process a session

Request:

```json
{
  "sessionID": "unique-session-id",
  "token": "generated-token"
}
```

#### GET `/health`

Check database connection status

### Database Schema

#### sessions table

- `id`: Auto-increment primary key
- `session_id`: Unique session identifier
- `fbclid`: Facebook click ID
- `status`: 'pending' or 'done'
- `token`: HMAC-SHA256 token
- `created_at`: Timestamp when session was created
- `updated_at`: Timestamp when session was last updated
- `processed_at`: Timestamp when session was marked as done

#### verification_logs table

- `id`: Auto-increment primary key
- `session_id`: Reference to sessions.session_id
- `event_id`: Meta event ID
- `fbclid`: Facebook click ID
- `client_ip`: Client IP address
- `client_user_agent`: Client user agent
- `capi_status`: Status of Meta CAPI event (success/failed/error)
- `created_at`: Timestamp of verification

### Key Changes from Redis to PostgreSQL

1. **No Session Deletion**: Sessions are kept in the database indefinitely for audit purposes
2. **Atomic Transactions**: Uses `BEGIN...COMMIT` for race condition prevention
3. **Row-Level Locking**: Uses `FOR UPDATE` instead of Redis NX locks
4. **Audit Trail**: `verification_logs` table maintains complete history of all verifications
5. **No Expiration**: Removed TTL mechanism - sessions persist permanently

### Troubleshooting

**Connection Error**: Verify PostgreSQL is running and credentials are correct

```bash
psql -U postgres -h localhost -d watchott
```

**Table Not Found**: Make sure schema.sql was executed

```bash
psql -U postgres -d watchott -f schema.sql
```

**Permission Denied**: Check user permissions in PostgreSQL

```bash
psql -U postgres
ALTER USER postgres WITH PASSWORD 'new-password';
```
