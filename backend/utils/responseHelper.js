/**
 * Send success response
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  const response = {
    success: true
  };

  if (message) {
    response.message = message;
  }

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
const errorResponse = (res, error = 'An error occurred', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: error
  });
};

module.exports = {
  successResponse,
  errorResponse
};