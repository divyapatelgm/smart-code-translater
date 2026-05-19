/* Express knows errorHandler is an error handler because it has 4 parameters (err, req, res, next). 
The notFoundHandler catches requests to routes that don't exist (like GET /api/nonexistent). */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong on the server.",
  });
};