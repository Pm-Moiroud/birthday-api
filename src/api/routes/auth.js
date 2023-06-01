const express = require('express');

const {
  register,
  login,
  refreshToken,
  revokeRefreshTokens,
} = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/revokeRefreshTokens', revokeRefreshTokens);

module.exports = router;
