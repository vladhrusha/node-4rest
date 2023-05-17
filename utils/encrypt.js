const crypto = require("crypto");
const util = require("util");

const logger = require("./logger");
const pbkdf2 = util.promisify(crypto.pbkdf2);

const encrypt = async (password) => {
  try {
    const derivedKey = await pbkdf2(password, "salt", 100000, 64, "sha512");

    return derivedKey.toString("hex");
  } catch (err) {
    logger.info(err);
  }
};

module.exports = encrypt;
