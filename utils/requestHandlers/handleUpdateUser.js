/* eslint-disable camelcase */
const { updateUser, getByNickname } = require("../../services/user.service");
const encrypt = require("../encrypt");

const handleUpdateUser = async (req, res) => {
  const { nickname, lastname, firstname, newPassword } = req.body;

  const encryptionResult = await encrypt(newPassword);
  const salt = encryptionResult.salt;
  const encryptedPassword = encryptionResult.password;
  const updated_at = Date.now();
  const user = await getByNickname({ nickname });
  const lastModified = user.updated_at;

  const ifUnmodifiedSince = new Date(req.headers["if-unmodified-since"]);

  if (ifUnmodifiedSince && new Date(ifUnmodifiedSince) < lastModified) {
    throw new Error("User has been modified since last retrieved");
  }

  updateUser({
    nickname,
    encryptedPassword,
    firstname,
    lastname,
    salt,
    updated_at,
  });
};

module.exports = handleUpdateUser;
