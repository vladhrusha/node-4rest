const { deleteAllUsers } = require("../../services/user.service");
const logger = require("../logger");

const handleDeleteUsers = async (reqBody) => {
  try {
    deleteAllUsers();
  } catch (err) {
    logger.err(err);
  }
};

module.exports = handleDeleteUsers;
