const { addUser } = require("../../services/user.service");
const encrypt = require("../encrypt");
const logger = require("../logger");

const handleAddUser = async (reqBody) => {
  try {
    const { nickname, lastname, firstname } = reqBody;
    let { password } = reqBody;
    password = await encrypt(password);
    addUser({ nickname, password, firstname, lastname });
  } catch (err) {
    logger.err(err);
  }
};

module.exports = handleAddUser;
