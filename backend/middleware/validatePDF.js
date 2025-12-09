const path = require('path');
const { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, ERROR_MESSAGES } = require('../config/constants');
const { errorResponse } = require('../utils/responseHelper');

/**
 * Validate that uploaded file is a PDF
 */
const validatePDF = (req, res, next) => {
  // Check if file exists
  if (!req.file) {
    return errorResponse(res, ERROR_MESSAGES.NO_FILE, 400);
  }

  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  const fileMimeType = req.file.mimetype;

  // Validate extension
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    return errorResponse(res, ERROR_MESSAGES.INVALID_FILE_TYPE, 400);
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(fileMimeType)) {
    return errorResponse(res, ERROR_MESSAGES.INVALID_FILE_TYPE, 400);
  }

  // File is valid, proceed
  next();
};

module.exports = validatePDF;