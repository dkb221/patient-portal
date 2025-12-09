const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initializeDatabase } = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (for serving uploads if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize Database
initializeDatabase();

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${process.env.UPLOAD_PATH}`);
  console.log(`💾 Database: ${process.env.DB_PATH}`);
});

module.exports = app;