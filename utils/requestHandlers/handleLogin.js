const { getByNickname } = require("../../services/user.service");
const base64 = require("base-64");

const handleLogin = async (req) => {
  const authHeader = req.headers.authorization;
  const credentials = base64.decode(authHeader.split(" ")[1]);
  const [nickname] = credentials.split(":");
  return await getByNickname({ nickname });
};

module.exports = handleLogin;
