// eslint-disable-next-line
const crypto = require("crypto");
const logger = require("../utils/logger");

// eslint-disable-next-line
console.log("test commit");

const { getAllUsers } = require("../services/user.service");

const funcName = async () => {
  const data = await getAllUsers();
  logger.info(data);
};

funcName();
