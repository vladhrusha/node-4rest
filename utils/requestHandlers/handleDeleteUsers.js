const { deleteAllUsers } = require("../../services/user.service");
const handleDeleteUsers = () => {
  deleteAllUsers();
};

module.exports = handleDeleteUsers;
