const makeError = require('./makeError');

function excludeFields(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

function formatAuthorization(authorization) {
  let jwtHeaders = '';
  if (authorization.startsWith('Bearer ')) {
    jwtHeaders = authorization.substring(7, authorization.length);
  } else {
    jwtHeaders = authorization;
  }

  return jwtHeaders;
}

module.exports = {
  excludeFields,
  formatAuthorization,
};
