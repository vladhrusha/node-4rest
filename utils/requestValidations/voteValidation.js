const { body } = require("express-validator");
// const logger = require("../logger");

const voteValidation = [
  body("value")
    .not()
    .isString()
    .withMessage("Vote value must be integer")
    .custom((val) => {
      if (![-1, 0, 1].includes(val)) {
        return false;
      }
      return true;
    })
    .withMessage("Vote value should be either -1, 0, or 1"),
  body("destNickname").exists().withMessage("destination nickname is required"),
];
module.exports = voteValidation;
