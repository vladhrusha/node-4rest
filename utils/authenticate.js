const crypto = require("crypto");
const util = require("util");

const logger = require("./logger");
const pbkdf2 = util.promisify(crypto.pbkdf2);
const { getByNickname } = require("../services/user.service");

const authenticate = async ({ nickname, password }) => {
  try {
    const user = await getByNickname({ nickname });
    const derivedKey = await pbkdf2(password, user.salt, 100000, 64, "sha512");
    const encryptedPassword = derivedKey.toString("hex");

    if (user && user.password === encryptedPassword) {
      return true;
    }
    return false;
  } catch (err) {
    logger.info("Unable to authenticate user:");
    logger.error(err);
  }
};

module.exports = { authenticate };
