const Document = require('../models/Document');
const { deleteFile, fileExists } = require('../utils/fileHelper');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../config/constants');
const path = require('path');

/**
 * Upload a new document
 * POST /api/documents/upload
 */
exports.uploadDocument = async (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return errorResponse(res, ERROR_MESSAGES.NO_FILE, 400);
    }

    const { originalname, filename, size, path: filepath } = req.file;

    // Save document metadata to database
    const document = await Document.createDocument(
      originalname,
      filepath,
      size
    );

    return successResponse(
      res,
      {
        id: document.id,
        filename: document.filename,
        filesize: document.filesize,
        created_at: document.created_at
      },
      SUCCESS_MESSAGES.UPLOAD_SUCCESS,
      201
    );

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up file if database save failed
    if (req.file) {
      await deleteFile(req.file.path);
    }
    
    return errorResponse(res, ERROR_MESSAGES.UPLOAD_FAILED, 500);
  }
};

/**
 * Get all documents
 * GET /api/documents
 */
exports.getAllDocuments = async (req, res, next) => {
  try {
    const documents = await Document.findAll();

    // Remove filepath from response (security)
    const sanitizedDocuments = documents.map(doc => ({
      id: doc.id,
      filename: doc.filename,
      filesize: doc.filesize,
      created_at: doc.created_at
    }));

    return successResponse(res, sanitizedDocuments);

  } catch (error) {
    console.error('Get documents error:', error);
    return errorResponse(res, ERROR_MESSAGES.DATABASE_ERROR, 500);
  }
};

/**
 * Download a document
 * GET /api/documents/:id
 */
exports.downloadDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find document in database
    const document = await Document.findById(id);

    if (!document) {
      return errorResponse(res, ERROR_MESSAGES.DOCUMENT_NOT_FOUND, 404);
    }

    // Check if file exists on disk
    const exists = await fileExists(document.filepath);
    if (!exists) {
      return errorResponse(res, 'File not found on server', 404);
    }

    // Send file
    const absolutePath = path.resolve(document.filepath);
    res.download(absolutePath, document.filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        if (!res.headersSent) {
          return errorResponse(res, 'Error downloading file', 500);
        }
      }
    });

  } catch (error) {
    console.error('Download error:', error);
    return errorResponse(res, ERROR_MESSAGES.DATABASE_ERROR, 500);
  }
};

/**
 * Delete a document
 * DELETE /api/documents/:id
 */
exports.deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find document in database
    const document = await Document.findById(id);

    if (!document) {
      return errorResponse(res, ERROR_MESSAGES.DOCUMENT_NOT_FOUND, 404);
    }

    // Delete file from disk
    const fileDeleted = await deleteFile(document.filepath);
    
    if (!fileDeleted) {
      console.warn(`File not found on disk: ${document.filepath}`);
    }

    // Delete from database
    await Document.deleteById(id);

    return successResponse(
      res,
      { id: parseInt(id) },
      SUCCESS_MESSAGES.DELETE_SUCCESS
    );

  } catch (error) {
    console.error('Delete error:', error);
    return errorResponse(res, ERROR_MESSAGES.DELETE_FAILED, 500);
  }
};