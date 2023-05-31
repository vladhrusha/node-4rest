// const logger = require("../logger");
const updateUserErrorResponse = async ({ err, res }) => {
  switch (err.message) {
    case "User has been modified since last retrieved":
      res.status(412).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: err.message });
      break;
  }
};

module.exports = updateUserErrorResponse;
