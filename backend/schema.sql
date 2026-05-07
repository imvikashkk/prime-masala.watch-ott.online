CREATE TABLE IF NOT EXISTS sessions (
  id           SERIAL PRIMARY KEY,
  session_id   VARCHAR(255) UNIQUE NOT NULL,
  fbclid       VARCHAR(255),
  status       VARCHAR(50)  DEFAULT 'pending',
  token        TEXT         NOT NULL,
  price        NUMERIC,
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_session_id     ON sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_session_status ON sessions(status);