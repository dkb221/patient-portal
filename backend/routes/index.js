const express = require('express');
const documentRoutes = require('./documentRoutes');

const router = express.Router();

// Document routes
router.use('/documents', documentRoutes);

// Root route
router.get('/', (req, res) => {
  res.json({
    message: 'Patient Portal API',
    version: '1.0.0',
    endpoints: {
      documents: '/api/documents'
    }
  });
});

module.exports = router;