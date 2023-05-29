const { addVote } = require("../../services/user.service");
// const logger = require("../logger");

const handleVote = async (req, res) => {
  const { destNickname, value } = req.body;
  const sourceNickname = req.user.nickname;
  const sourceUserId = req.body.userId;
  if (sourceNickname === destNickname) {
    return "You cannot vote for yourself.";
  }

  const addVoteResult = await addVote({ value, sourceUserId, destNickname });
  return addVoteResult;
};

module.exports = handleVote;
