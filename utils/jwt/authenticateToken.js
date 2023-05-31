const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    } else {
      req.user = decoded;

      next();
    }
  });
};
module.exports = authenticateToken;
