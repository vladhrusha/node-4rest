const express = require("express");
const {
  handleAddUser,
  handleGetByNickname,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUsers,
} = require("./utils/requestHandlers");
const {
  addUserValidation,
  getAllUsersValidation,
  getByNicknameValidation,
  updateUserValidation,
} = require("./utils/requestValidations");
const app = express();
require("dotenv").config();
const logger = require("./utils/logger");
const { validationResult } = require("express-validator");

const port = process.env.PORT || 1337;
app.use(express.json());
const appName = "task4";
const appVersion = process.env.APP_VERSION;
const { authMiddleware } = require("./utils/authMiddleware");

// add user
app.post(`/${appName}/${appVersion}/user`, addUserValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    handleAddUser(req.body);
    res.status(201).json({ message: "user added" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// update user
app.put(
  `/${appName}/${appVersion}/user`,
  authMiddleware,
  updateUserValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await handleUpdateUser(req.body);
    res.status(200).json({ message: "user updated" });
  },
);
// get all users
app.get(
  `/${appName}/${appVersion}/users`,
  getAllUsersValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const users = await handleGetUsers(req.body);
      res.status(200).json({ message: users });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
);
// get user by nickname
app.get(
  `/${appName}/${appVersion}/user/:nickname`,
  getByNicknameValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const nickname = req.params.nickname;
      const user = await handleGetByNickname(nickname);
      res.status(200).json({ message: user });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
);
// delete users
app.delete(
  `/${appName}/${appVersion}/users`,
  authMiddleware,
  async (req, res) => {
    try {
      await handleDeleteUsers();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
);
app.listen(port, () => {
  logger.info(`\n\nServer running on port ${port}.\n\n`);
});
