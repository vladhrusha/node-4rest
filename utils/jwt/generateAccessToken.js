const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const generateAccessToken = ({ user, userId }) => {
  return jwt.sign(
    { nickname: user.nickname, role: user.role, userId },
    secret,
    {
      expiresIn: "24h",
    },
  );
};
module.exports = generateAccessToken;
