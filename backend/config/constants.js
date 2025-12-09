module.exports = {
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  ALLOWED_MIME_TYPES: ['application/pdf'],
  ALLOWED_EXTENSIONS: ['.pdf'],
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
  
  ERROR_MESSAGES: {
    NO_FILE: 'No file uploaded',
    INVALID_FILE_TYPE: 'Only PDF files are allowed',
    FILE_TOO_LARGE: 'File size exceeds 10MB limit',
    DOCUMENT_NOT_FOUND: 'Document not found',
    UPLOAD_FAILED: 'Failed to upload document',
    DELETE_FAILED: 'Failed to delete document',
    DATABASE_ERROR: 'Database operation failed'
  },

  SUCCESS_MESSAGES: {
    UPLOAD_SUCCESS: 'Document uploaded successfully',
    DELETE_SUCCESS: 'Document deleted successfully'
  }
};