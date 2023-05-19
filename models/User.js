const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  password: { type: String, require: true },
  salt: { type: String, required: true },
});

const User = mongoose.model("User", subscriptionSchema, "users");

module.exports = User;
