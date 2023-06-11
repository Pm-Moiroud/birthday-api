const jwt = require('jsonwebtoken');
const makeError = require('../../utils/makeError');
const { formatAuthorization } = require('../../utils/commons');

function isAuthenticated(req, _, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    makeError('Provide a valid authorization header with a Bearer token', 401);
  }

  let jwtHeaders = formatAuthorization(authorization);
  try {
    const payload = jwt.verify(jwtHeaders, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    console.error(err);
    if (err.name === 'TokenExpiredError') {
      makeError(err.name, 403);
    }
    makeError('Unauthorized', 401);
  }
}

module.exports = isAuthenticated;
