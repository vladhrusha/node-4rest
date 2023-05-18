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
app.put(
  `/${appName}/${appVersion}/user`,
  authMiddleware,
  updateUserValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedUser = await handleUpdateUser(req.body);
    if (updatedUser) {
      res.status(200).json({ message: "user updated", updatedUser });
    } else {
      res.status(401).send("Authentication failed");
    }
  },
);
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
app.get(
  `/${appName}/${appVersion}/user`,
  getByNicknameValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await handleGetByNickname(req.body);
      res.status(200).json({ message: user });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
);
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
