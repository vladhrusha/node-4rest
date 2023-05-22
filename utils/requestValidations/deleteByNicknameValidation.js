const { param } = require("express-validator");

const deleteByNicknameValidation = [
  param("nickname").exists().withMessage("nickname parameter is required"),
];
module.exports = deleteByNicknameValidation;
