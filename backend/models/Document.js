const { db } = require('../config/database');

class Document {
  /**
   * Create a new document record
   */
  static createDocument(filename, filepath, filesize) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO documents (filename, filepath, filesize)
        VALUES (?, ?, ?)
      `;

      db.run(sql, [filename, filepath, filesize], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            filename,
            filepath,
            filesize,
            created_at: new Date().toISOString()
          });
        }
      });
    });
  }

  /**
   * Get all documents
   */
  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, filename, filepath, filesize, created_at
        FROM documents
        ORDER BY created_at DESC
      `;

      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * Find document by ID
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, filename, filepath, filesize, created_at
        FROM documents
        WHERE id = ?
      `;

      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Delete document by ID
   */
  static deleteById(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM documents WHERE id = ?`;

      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }

  /**
   * Get document count
   */
  static getCount() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) as count FROM documents`;

      db.get(sql, [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count);
        }
      });
    });
  }
}

module.exports = Document;