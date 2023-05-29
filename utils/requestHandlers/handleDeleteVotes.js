const { deleteAllVotes } = require("../../services/user.service");
const handleDeleteVotes = () => {
  deleteAllVotes();
};

module.exports = handleDeleteVotes;
