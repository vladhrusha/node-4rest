const logger = require("../../logger");
const errorResponse500 = async ({ err, res }) => {
  logger.info(err);
  res.status(500).json({ message: err.message });
};

module.exports = errorResponse500;
