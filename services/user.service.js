/* eslint-disable camelcase */
const User = require("../models/User");
const Vote = require("../models/Vote");

// eslint-disable-next-line
const mongoose = require("../db/index");
// eslint-disable-next-line
const logger = require("../utils/logger");
const deleteAllUsers = async () => {
  await User.deleteMany();
};
const deleteUserByName = async ({ nickname, deleted_at }) => {
  await User.updateOne(
    { nickname },
    {
      $set: {
        deleted_at,
      },
    },
  );
};
const getAllUsers = async (offset, limit) => {
  const users = await User.find().skip(offset).limit(limit);
  const totalUsers = await User.countDocuments();
  return { users, totalUsers };
};
const getByNickname = async ({ nickname }) => {
  return await User.findOne({ nickname });
};

const addUser = async ({ nickname, firstname, lastname, password, salt }) => {
  const newUser = new User({
    nickname,
    firstname,
    lastname,
    password,
    salt,
  });
  await newUser.save();
};

const updateUser = async ({
  nickname,
  lastname,
  firstname,
  encryptedPassword,
  salt,
  updated_at,
}) => {
  await User.updateOne(
    { nickname },
    {
      $set: {
        lastname,
        firstname,
        password: encryptedPassword,
        salt,
        updated_at,
      },
    },
  );
};

const addVote = async ({ value, sourceUserId, destNickname }) => {
  const destinationUser = await User.findOne({
    nickname: destNickname,
  });
  logger.info(`${destNickname}`);
  if (!destinationUser) {
    return "Destination user not found.";
  }
  const vote = await Vote.findOne({
    userTo: destinationUser._id,
    userFrom: sourceUserId,
  });

  logger.info(sourceUserId);

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const hasVotedRecently =
    vote && vote.timestamp && vote.timestamp > oneHourAgo;
  if (hasVotedRecently) {
    return "You can only vote once per hour.";
  }
  if (vote && vote.timestamp) {
    const previousVote = vote.value;
    if (previousVote !== vote) {
      vote.value = value;
      vote.timestamp = now.getTime();
      destinationUser.rating = destinationUser.rating - parseInt(previousVote);
      await vote.save();
    }
  } else {
    const newVote = new Vote({
      userTo: destinationUser._id,
      userFrom: sourceUserId,
      value,
    });
    await newVote.save();
  }
  const updatedVotes = await Vote.find({ userTo: destinationUser._id });
  const newRating = updatedVotes.reduce(
    (total, vote) => total + parseInt(vote.value),
    0,
  );

  destinationUser.rating = newRating;
  await destinationUser.save();
};

const deleteAllVotes = async () => {
  await Vote.deleteMany();
};

module.exports = {
  getAllUsers,
  addUser,
  getByNickname,
  updateUser,
  deleteAllUsers,
  deleteUserByName,
  addVote,
  deleteAllVotes,
};
