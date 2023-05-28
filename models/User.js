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
  votes: [
    {
      nickname: { type: String, required: true },
      // value: { type: Number, enum: [-1, 1, 0] },
      value: { type: Number },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  rating: { type: Number, default: 0 },
});

const User = mongoose.model("User", subscriptionSchema, "users");

module.exports = User;
