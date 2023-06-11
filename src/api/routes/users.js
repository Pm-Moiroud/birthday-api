const express = require('express');

const {
  showUser,
  getAllUsers,
  getCurrentUser,
  deleteUser,
  updateUser,
} = require('../controllers/UsersController');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/current', getCurrentUser);

router.get('/:userId', showUser);

router.delete('/:userId', deleteUser);

router.put('/:userId', updateUser);

module.exports = router;
