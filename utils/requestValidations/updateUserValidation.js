const { body, header } = require("express-validator");

const updateUserValidation = [
  body("nickname").exists().withMessage("Nickname is required"),
  body("lastname")
    .optional()
    .isString()
    .withMessage("lastname must be a string"),
  body("firstname")
    .optional()
    .isString()
    .withMessage("firstname must be a string"),
  body("password").exists().isString().withMessage("password is required"),
  body("newPassword")
    .exists()
    .isString()
    .withMessage("new password is required"),
  header("if-unmodified-since")
    .exists()
    .withMessage("If-Unmodified-Since header is missing"),
];
module.exports = updateUserValidation;
