const { formatAuthorization } = require('../../utils/commons');
const { hashToken } = require('../../utils/hashToken');
const makeError = require('../../utils/makeError');
const { deleteAllUserRefreshTokens } = require('../services/AuthServices');

const {
  allUsers,
  findUserById,
  deleteUserById,
  updateUserById,
} = require('../services/UserServices');

const jwt = require('jsonwebtoken');

async function getAllUsers(req, res, next) {
  try {
    const all = await allUsers();
    const userWithoutPassword = all.map((user) => {
      delete user.password;
      return user;
    });
    res.json({ data: userWithoutPassword });
  } catch (err) {
    next(err);
  }
}

async function showUser(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await findUserById(userId);
    if (!user) return makeError('User not found', 404);

    const updatedUser = await updateUserById(userId, req.body);

    delete updatedUser.password;

    res.json({
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { userId } = req.payload;

    const user = await findUserById(userId);

    if (!user) return makeError('User not found', 404);

    await deleteUserById(userId);

    res.json({ message: 'User deleted', status: 200 });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  showUser,
  updateUser,
  getCurrentUser,
};
