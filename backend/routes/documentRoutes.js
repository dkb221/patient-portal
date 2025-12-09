const express = require('express');
const router = express.Router();

const documentController = require('../controllers/documentController');
const upload = require('../middleware/upload');
const validatePDF = require('../middleware/validatePDF');

/**
 * @route   POST /api/documents/upload
 * @desc    Upload a PDF document
 * @access  Public
 */
router.post(
  '/upload',
  upload.single('file'),
  validatePDF,
  documentController.uploadDocument
);

/**
 * @route   GET /api/documents
 * @desc    Get all documents
 * @access  Public
 */
router.get('/', documentController.getAllDocuments);

/**
 * @route   GET /api/documents/:id
 * @desc    Download a specific document
 * @access  Public
 */
router.get('/:id', documentController.downloadDocument);

/**
 * @route   DELETE /api/documents/:id
 * @desc    Delete a document
 * @access  Public
 */
router.delete('/:id', documentController.deleteDocument);

module.exports = router;