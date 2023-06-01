const express = require('express');

const { showUser, getAllUsers } = require('../controllers/UsersController');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:userId', showUser);

module.exports = router;
