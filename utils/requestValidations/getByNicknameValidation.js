const { param } = require("express-validator");

const getByNicknameValidation = [
  param("nickname").exists().withMessage("nickname parameter is required"),
];
module.exports = getByNicknameValidation;
