const { addUser } = require("../../services/user.service");
const encrypt = require("../encrypt");
// const logger = require("../logger");

const handleAddUser = async (reqBody) => {
  const { nickname, lastname, firstname } = reqBody;
  let { password } = reqBody;
  const encryptionResult = await encrypt(password);
  const salt = encryptionResult.salt;
  password = encryptionResult.password;
  addUser({ nickname, password, firstname, lastname, salt });
};

module.exports = handleAddUser;
