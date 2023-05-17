const { getAllUsers } = require("../../services/user.service");
const logger = require("../logger");

const handleGetUsers = async (reqBody) => {
  try {
    const page = reqBody.page || 1;
    const limit = reqBody.limit || 5;
    const offset = (page - 1) * limit;

    const { users, totalUsers } = await getAllUsers(offset, limit);
    return {
      users: users.map((entity) => {
        return {
          nickname: entity.nickname,
          firstname: entity.firstname,
          lastname: entity.lastname,
        };
      }),
      totalUsers,
    };
  } catch (err) {
    logger.err(err);
  }
};

module.exports = handleGetUsers;
