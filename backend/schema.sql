CREATE TABLE IF NOT EXISTS sessions (
  id           SERIAL PRIMARY KEY,
  fbclid       VARCHAR(255) UNIQUE NOT NULL,
  status       VARCHAR(50)  DEFAULT 'pending',
  token        TEXT         NOT NULL,
  price        NUMERIC,
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP
);
 
CREATE INDEX IF NOT EXISTS idx_fbclid         ON sessions(fbclid);
CREATE INDEX IF NOT EXISTS idx_session_status ON sessions(status);