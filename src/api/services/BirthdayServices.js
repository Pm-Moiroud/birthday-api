const dayjs = require('dayjs');
const { db } = require('../../utils/db');

function StoreBirthday(birthday) {
  return db.birthday.create({
    data: birthday,
    include: { User: true, Status: true },
  });
}

function getAllBirthdaysUserId(userId) {
  return db.birthday.findMany({
    where: {
      userId,
    },
  });
}

function getBirthdayById(id) {
  return db.birthday.findUnique({
    where: {
      id,
    },
  });
}

function updateBirthdayById(id, birthday) {
  return db.birthday.update({
    where: {
      id,
    },
    data: birthday,
  });
}

function findAllRemindersByDate(startedAt, endedAt) {
  return db.birthday.findMany({
    where: {
      reminder_email: { gt: 0 },
      started_at: dayjs(startedAt).isSame(dayjs(), 'day'),
      ended_at: dayjs(endedAt).isSame(dayjs(), 'day'),
    },
    include: { User: true },
  });
}

function searchBirthdaysByUserId(userId, search, page) {
  const limit = 10;
  const offset = (page - 1) * limit;
  return db.birthday.findMany({
    where: {
      userId,
      name: { contains: search },
    },
    include: { User: true, Status: true },

    take: limit,
    skip: offset,
  });
}

function deleteBirthdayById(id) {
  return db.birthday.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  StoreBirthday,
  getAllBirthdaysUserId,
  getBirthdayById,
  updateBirthdayById,
  findAllRemindersByDate,
  searchBirthdaysByUserId,
  deleteBirthdayById,
};
