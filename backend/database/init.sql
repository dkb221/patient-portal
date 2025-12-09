-- Documents table schema
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  filepath TEXT NOT NULL,
  filesize INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries on created_at
CREATE INDEX IF NOT EXISTS idx_created_at ON documents(created_at DESC);

-- Sample data for testing (optional)
-- INSERT INTO documents (filename, filepath, filesize) 
-- VALUES ('sample.pdf', './uploads/sample.pdf', 245678);