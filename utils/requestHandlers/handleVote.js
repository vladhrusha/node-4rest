const { addVote } = require("../../services/user.service");
// const logger = require("../logger");

const handleVote = async (req, res) => {
  const { destNickname, vote } = req.body;
  const sourceNickname = req.user.nickname;
  if (sourceNickname === destNickname) {
    return "You cannot vote for yourself.";
  }

  const addVoteResult = await addVote({ vote, sourceNickname, destNickname });
  return addVoteResult;
};

module.exports = handleVote;
