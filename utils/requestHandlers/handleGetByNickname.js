const { getByNickname } = require("../../services/user.service");
const logger = require("../logger");

const handleGetByNickname = async (reqBody) => {
  try {
    const { nickname } = reqBody;
    const dbResponse = await getByNickname({ nickname });
    return {
      nickname: dbResponse.nickname,
      password: dbResponse.password,
      firstname: dbResponse.firstname,
      lastname: dbResponse.lastname,
    };
  } catch (err) {
    logger.error(err);
  }
};

module.exports = handleGetByNickname;
