// const logger = require("../logger");
const postVoteErrorResponse = async ({ result, res }) => {
  switch (result) {
    case "You cannot vote for yourself.":
      res.status(400).json({ err: result });
      break;
    case "Destination user not found.":
      res.status(404).json({ err: result });
      break;
    case "You can only vote once per hour.":
      res.status(429).json({ err: result });
      break;
    default:
      res.status(200).json({ placeholder: "success" });
      break;
  }
};

module.exports = postVoteErrorResponse;
