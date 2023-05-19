const mongoose = require("mongoose");
require("dotenv").config();

const Db = process.env.ATLAS_URI;
const logger = require("../utils/logger");

let conn;
try {
  conn = mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  logger.error(err);
}
module.exports = conn;
