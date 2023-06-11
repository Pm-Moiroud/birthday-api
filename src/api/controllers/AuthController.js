const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { generateTokens } = require('../../utils/jwt');

const {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
} = require('../services/UserServices');

const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} = require('../services/AuthServices');

const { hashToken } = require('../../utils/hashToken');
const makeError = require('../../utils/makeError');

async function register(req, res, next) {
  try {
    const { email, password, pseudo } = req.body;
    if (!email || !password)
      makeError('You must provide an email and a password.', 500);

    const existingUser = await findUserByEmail(email);

    if (existingUser) makeError('Email already in use.', 500);

    const user = await createUserByEmailAndPassword({
      email,
      password,
      pseudo,
    });
    const jti = uuidv4();

    const { accessToken, refreshToken } = generateTokens(user, jti);

    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      makeError('You must provide an email and a password.', 500);
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) makeError('Invalid login credentials.', 500);

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) makeError('Invalid login credentials.', 500);

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
      user: existingUser,
    });
  } catch (err) {
    next(err);
  }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      makeError('Missing refresh token.', 404);
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      makeError('Unauthorized', 401);
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      makeError('Unauthorized', 401);
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      makeError('Unauthorized', 401);
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
}

async function revokeRefreshTokens(req, res, next) {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({
      message: `Tokens revoked for user with id #${userId}`,
      status: 200,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  revokeRefreshTokens,
};
