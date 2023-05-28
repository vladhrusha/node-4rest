const { body } = require("express-validator");
// const logger = require("../logger");

const voteValidation = [
  body("sourceNickname").exists().withMessage("source nickname is required"),
  body("vote")
    .exists()
    .withMessage("Vote change is required")
    .custom((val) => {
      if (val.matches(/^-?[01]$/)) return true;
      return false;
    })
    .withMessage("Vote value should be either -1, 0, or 1"),
  body("destNickname").exists().withMessage("destination nickname is required"),
];
module.exports = voteValidation;
