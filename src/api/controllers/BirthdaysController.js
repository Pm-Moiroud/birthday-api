const makeError = require('../../utils/makeError');
const {
  StoreBirthday,
  getAllBirthdaysUserId,
  searchBirthdaysByUserId,
  getBirthdayById,
  deleteBirthdayById,
  updateBirthdayById,
} = require('../services/BirthdayServices');

const { getStatusBySlug } = require('../services/StatusServices');

async function createBirthday(req, res, next) {
  const { name, started_at, ended_at } = req.body;

  if (!name || !started_at || !ended_at) {
    return next(makeError('Missing parameters', 400));
  }

  const defaultStatus = await getStatusBySlug('processing');

  try {
    const requestBirthday = {
      ...req.body,
      userId: req.payload.userId,
      statusId: defaultStatus.id,
    };
    const userBirthday = await StoreBirthday(requestBirthday);
    res.json({ data: userBirthday });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function getAllBirthdays(req, res, next) {
  try {
    const userBirthdays = await getAllBirthdaysUserId(req.payload.userId);
    res.json({ data: userBirthdays });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function updateBirthday(req, res, next) {
  try {
    const { birthdayId } = req.params;
    const birthday = await getBirthdayById(birthdayId);
    if (!birthday) makeError('Birthday not found', 404);
    if (birthday.userId !== req.payload.userId) {
      makeError('You are not authorized to update this birthday', 403);
    }

    const updatedBirthday = await updateBirthdayById(birthdayId, req.body);
    res.json({ data: updatedBirthday });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function searchBirthdays(req, res, next) {
  try {
    const { page } = req.query;
    const { search } = req.body;
    const userBirthdays = await searchBirthdaysByUserId(
      req.payload.userId,
      search,
      page
    );
    res.json({ data: userBirthdays });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function deleteBirthday(req, res, next) {
  try {
    const { birthdayId } = req.params;
    const birthday = await getBirthdayById(birthdayId);
    if (!birthday) {
      makeError('Birthday not found', 404);
    }

    await deleteBirthdayById(birthdayId);
    res.json({ data: 'birthday delete successfully', status: 200 });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  createBirthday,
  getAllBirthdays,
  updateBirthday,
  searchBirthdays,
  deleteBirthday,
};
