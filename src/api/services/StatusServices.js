const { db } = require('../../utils/db');

async function getStatusBySlug(slug) {
  return await db.status.findUnique({
    where: {
      slug,
    },
  });
}

async function getAllStatus() {
  return await db.status.findMany();
}

module.exports = {
  getStatusBySlug,
  getAllStatus,
};
