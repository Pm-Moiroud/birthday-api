const { db } = require('../../utils/db');

async function getStatus(_, res, next) {
  try {
    const status = await db.status.findMany();
    res.json({ data: status });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getStatus,
};
