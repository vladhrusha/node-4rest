const User = require("../models/User");
// eslint-disable-next-line
const mongoose = require("../db/index");
const logger = require("../utils/logger");

const deleteAllUsers = async () => {
  try {
    await User.deleteMany();
  } catch (err) {
    logger.error(err);
  }
};
const getAllUsers = async (offset, limit) => {
  try {
    const users = await User.find().skip(offset).limit(limit);
    const totalUsers = await User.countDocuments();
    return { users, totalUsers };
  } catch (err) {
    logger.error(err);
  }
};
const getByNickname = async ({ nickname }) => {
  try {
    return await User.findOne({ nickname });
  } catch (err) {
    logger.error(err);
  }
};

const addUser = async ({ nickname, firstname, lastname, password, salt }) => {
  try {
    const newUser = new User({
      nickname,
      firstname,
      lastname,
      password,
      salt,
    });
    await newUser.save();
  } catch (err) {
    logger.error(err);
  }
};

const updateUser = async ({
  nickname,
  lastname,
  firstname,
  encryptedPassword,
  salt,
}) => {
  try {
    await User.updateOne(
      { nickname },
      {
        $set: { lastname, firstname, password: encryptedPassword, salt },
      },
    );
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getByNickname,
  updateUser,
  deleteAllUsers,
};
