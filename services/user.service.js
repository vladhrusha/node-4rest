/* eslint-disable camelcase */
const User = require("../models/User");
const Vote = require("../models/Vote");

// eslint-disable-next-line
const mongoose = require("../db/index");
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

const addVote = async ({ vote, sourceNickname, destNickname }) => {
  const destinationUser = await User.findOne({
    nickname: destNickname,
  });
  if (!destinationUser) {
    return "Destination user not found.";
  }
  const votes = await Vote.find({
    user: destinationUser._id,
    sourceNickname,
  });

  let indexOfNickname;
  for (const [index, vote] of votes.entries()) {
    if (vote.sourceNickname === sourceNickname) {
      indexOfNickname = index;
      break;
    }
  }
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const hasVotedRecently = votes[indexOfNickname].timestamp > oneHourAgo;
  if (hasVotedRecently) {
    return "You can only vote once per hour.";
  }
  logger.info(`${indexOfNickname}`);
  if (indexOfNickname !== undefined) {
    const previousVote = votes[indexOfNickname].value;
    if (previousVote !== vote) {
      votes[indexOfNickname].value = vote;
      destinationUser.rating = destinationUser.rating - parseInt(previousVote);
      votes[indexOfNickname].save();
    }
  } else {
    const newVote = new Vote({
      user: destinationUser._id,
      sourceNickname,
      value: vote,
    });
    await newVote.save();
    await User.findByIdAndUpdate(
      destinationUser._id,
      { $push: { votes: newVote._id } },
      { new: true },
    );
  }
  destinationUser.rating = destinationUser.rating + parseInt(vote);
  await destinationUser.save();
};

module.exports = {
  getAllUsers,
  addUser,
  getByNickname,
  updateUser,
  deleteAllUsers,
  deleteUserByName,
  addVote,
};
