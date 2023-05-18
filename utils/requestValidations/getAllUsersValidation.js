const { body } = require("express-validator");

const getAllUsersValidation = [
  body("page").isInt().withMessage("Page must be an integer"),
  body("limit").isInt().withMessage("Limit must be an integer"),
];
module.exports = getAllUsersValidation;
