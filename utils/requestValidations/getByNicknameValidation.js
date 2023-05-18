const { body } = require("express-validator");

const getByNicknameValidation = [
  body("nickname").exists().withMessage("Nickname is required"),
];
module.exports = getByNicknameValidation;
