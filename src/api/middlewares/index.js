const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('Provide a valid authorization header with a Bearer token');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    console.log(payload);
    req.payload = payload;
    next(); // Call next() to proceed to the next middleware/route handler
  } catch (err) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    throw new Error('🚫 Unauthorized 🚫');
  }
}

module.exports = isAuthenticated;
