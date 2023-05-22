/* eslint-disable camelcase */
const { deleteUserByName } = require("../../services/user.service");
const handleDeleteUser = (req) => {
  const nickname = req.body.nickname;
  const deleted_at = Date.now();

  deleteUserByName({ nickname, deleted_at });
};

module.exports = handleDeleteUser;
