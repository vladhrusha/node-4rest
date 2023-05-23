/* eslint-disable camelcase */
const User = require("../models/User");
// eslint-disable-next-line
const mongoose = require("../db/index");
// const logger = require("../utils/logger");

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

module.exports = {
  getAllUsers,
  addUser,
  getByNickname,
  updateUser,
  deleteAllUsers,
  deleteUserByName,
};
