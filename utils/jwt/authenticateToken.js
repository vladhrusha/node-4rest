const jwt = require("jsonwebtoken");
// const logger = require("../logger");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    } else {
      // logger.info("1" + " " + decoded.role);
      req.user = decoded;

      next();
    }
  });
};
module.exports = authenticateToken;
