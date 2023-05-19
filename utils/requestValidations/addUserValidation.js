const { body } = require("express-validator");

const addUserValidation = [
  body("nickname").exists().withMessage("Nickname is required"),
  body("firstname")
    .optional()
    .isString()
    .withMessage("Firstname must be a string"),
  body("lastname")
    .optional()
    .isString()
    .withMessage("Lastname must be a string"),
  body("password").exists().isString().withMessage("Password is required"),
];
module.exports = addUserValidation;
