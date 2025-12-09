const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || './database/database.sqlite';

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('📂 Database directory created');
}

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Initialize database tables
const initializeDatabase = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      filepath TEXT NOT NULL,
      filesize INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
    } else {
      console.log('✅ Documents table ready');
      
      // Create index AFTER table is created
      const createIndexSQL = `
        CREATE INDEX IF NOT EXISTS idx_created_at 
        ON documents(created_at DESC)
      `;

      db.run(createIndexSQL, (err) => {
        if (err) {
          console.error('⚠️  Error creating index:', err.message);
        } else {
          console.log('✅ Index created successfully');
        }
      });
    }
  });
};

module.exports = { db, initializeDatabase };