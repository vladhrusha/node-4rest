const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  password: { type: String, require: true },
  salt: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  rating: { type: Number, default: 0 },
});

const User = mongoose.model("User", subscriptionSchema, "users");

module.exports = User;
