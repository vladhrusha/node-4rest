const Subscription = require("../models/User");
// eslint-disable-next-line
const mongoose = require("../db/index");
const logger = require("../utils/logger");

const getAllUsers = async () => {
  try {
    return await Subscription.find();
  } catch (err) {
    logger.error(err);
  }
};
const getByNickname = async (nickname) => {
  try {
    return await Subscription.findOne({ nickname });
  } catch (err) {
    logger.error(err);
  }
};

const addUser = async ({ nickname, firstname, lastname, password }) => {
  try {
    const newSubscription = new Subscription({
      nickname,
      firstname,
      lastname,
      password,
    });
    await newSubscription.save();
  } catch (err) {
    logger.error(err);
  }
};

const updateUser = async ({ nickname, lastname, firstname, password }) => {
  try {
    await Subscription.updateOne(
      { nickname },
      {
        $set: { lastname, firstname, password },
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
};
