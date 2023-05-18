const { deleteAllUsers } = require("../../services/user.service");
const handleDeleteUsers = (reqBody) => {
  deleteAllUsers();
};

module.exports = handleDeleteUsers;
