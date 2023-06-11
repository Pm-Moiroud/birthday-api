const express = require('express');

const {
  createBirthday,
  getAllBirthdays,
  updateBirthday,
  searchBirthdays,
  deleteBirthday,
} = require('../controllers/BirthdaysController');

const router = express.Router();

router.get('/', getAllBirthdays);

router.post('/store', createBirthday);
router.put('/:birthdayId', updateBirthday);
router.delete('/:birthdayId/delete', deleteBirthday);

router.post('/search', searchBirthdays);

module.exports = router;
