const base64 = require("base-64");
const { authenticate } = require("./authenticate");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const credentials = base64.decode(authHeader.split(" ")[1]);
    const [nickname, password] = credentials.split(":");
    const authenticated = await authenticate({ nickname, password });
    if (authenticated) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { authMiddleware };
