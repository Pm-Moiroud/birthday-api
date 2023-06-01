const { allUsers, findUserById } = require('../services/UserServices');

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

module.exports = {
  getAllUsers,
  showUser,
};
