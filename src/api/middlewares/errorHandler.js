// Error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(err.status ?? 500).json({
    error: err.message ?? 'Something went wrong',
    status: err.status ?? 500,
  });
}

module.exports = errorHandler;
