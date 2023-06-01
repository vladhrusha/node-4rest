const addUserValidation = require("./addUserValidation");
const getAllUsersValidation = require("./getAllUsersValidation");
const getByNicknameValidation = require("./getByNicknameValidation");
const updateUserValidation = require("./updateUserValidation");
const deleteByNicknameValidation = require("./deleteByNicknameValidation");
const voteValidation = require("./voteValidation");

module.exports = {
  addUserValidation,
  getAllUsersValidation,
  getByNicknameValidation,
  updateUserValidation,
  deleteByNicknameValidation,
  voteValidation,
};
