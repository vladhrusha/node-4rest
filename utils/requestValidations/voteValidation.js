const { body } = require("express-validator");
// const logger = require("../logger");

const voteValidation = [
  body("sourceNickname").exists().withMessage("source nickname is required"),
  body("vote")
    .exists()
    .withMessage("Vote change is required")
    .matches(/^-?1$/, "g")
    .withMessage("Vote value should be -1, 0, or 1"),
  body("destNickname").exists().withMessage("destination nickname is required"),
];
module.exports = voteValidation;
