const { getByNickname, updateUser } = require("../../services/user.service");
const encrypt = require("../encrypt");
const logger = require("../logger");
const authenticate = require("../authenticate");

const handleUpdateUser = async (reqBody) => {
  try {
    const { nickname, password, lastname, firstname, newPassword } = reqBody;
    const encryptedPassword = await encrypt(newPassword);
    const authenticated = await authenticate({ nickname, password });
    if (authenticated) {
      updateUser({ nickname, encryptedPassword, firstname, lastname });
      const dbResponse = await getByNickname({ nickname });
      return {
        nickname: dbResponse.nickname,
        firstname: dbResponse.firstname,
        lastname: dbResponse.lastname,
        password: dbResponse.password,
      };
    } else {
      return false;
    }
  } catch (err) {
    logger.err(err);
  }
};

module.exports = handleUpdateUser;
