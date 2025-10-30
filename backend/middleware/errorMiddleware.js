// custom error-handling middleware functions for Express

const notFound = (req, res, next) => {
  const error = new Error(`Not found -${req.originalUrl}`);
  res.status(404);
  next(error);
};
// Creates an Error object with a message like:
// "Not found - /api/user/lo"
// Sets HTTP status to 404.
// Calls next(error) → this passes the error to the next error-handling middleware (errorHandler).
// So this middleware doesn’t send the response itself —
// it just forwards the error to be handled properly.

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    messsage: err.messsage,
  });
};

// This is the final middleware that catches any errors passed using next(error) (including from notFound).
// It checks the current response status:
// If it’s 200 (default), that means something unexpected happened, so use 500 (server error).
// Otherwise, use whatever status was already set (like 404).
// Sends a JSON response with the error message.

module.exports = { notFound, errorHandler };
