const { updateUser } = require("../../services/user.service");
const encrypt = require("../encrypt");
// const logger = require("../logger");

const handleUpdateUser = async (reqBody) => {
  const { nickname, lastname, firstname, newPassword } = reqBody;

  const encryptionResult = await encrypt(newPassword);
  const salt = encryptionResult.salt;
  const encryptedPassword = encryptionResult.password;

  updateUser({ nickname, encryptedPassword, firstname, lastname, salt });
};

module.exports = handleUpdateUser;
