/**
 * Global error handler middleware
 * Must be defined last, after all routes
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      error: 'File size exceeds 10MB limit'
    });
  }

  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;