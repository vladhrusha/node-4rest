const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  password: { type: String, require: true },
  salt: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
  rating: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
