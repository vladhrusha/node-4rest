const { body } = require("express-validator");
const logger = require("../logger");

const voteValidation = [
  body("sourceNickname").exists().withMessage("source nickname is required"),
  body("vote")
    .exists()
    .withMessage("Vote change is required")
    .custom((val) => {
      // if (!/^-?1$|^0$/.test(val)) {
      //   logger.info("fired");
      //   throw new Error("Vote value should be either -1, 0, or 1");
      // }
      if (!/^-?1$|^0$/.test(val)) {
        logger.info("fired");
        return false;
      }
      return true;
    })
    .withMessage("Vote value should be either -1, 0, or 1"),
  body("destNickname").exists().withMessage("destination nickname is required"),
];
module.exports = voteValidation;
