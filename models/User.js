const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, require: true },
});

const User = mongoose.model("User", subscriptionSchema, "users");

module.exports = User;
