const { getByNickname } = require("../../services/user.service");

const handleGetByNickname = async (nickname) => {
  const dbResponse = await getByNickname({ nickname });
  return {
    nickname: dbResponse.nickname,
    password: dbResponse.password,
    firstname: dbResponse.firstname,
    lastname: dbResponse.lastname,
  };
};

module.exports = handleGetByNickname;
