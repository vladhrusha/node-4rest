const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  value: { type: Number, enum: [-1, 1, 0], required: true },
  timestamp: { type: Date, default: Date.now },
});
const Vote = mongoose.model("Vote", voteSchema, "votes");

module.exports = Vote;
