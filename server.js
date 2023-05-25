const express = require("express");
const logger = require("./utils/logger");

const {
  handleAddUser,
  handleGetByNickname,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUsers,
  handleDeleteUser,
  handleLogin,
} = require("./utils/requestHandlers");

// jwt
const {
  generateAccessToken,
  authenticateToken,
} = require("./utils/jwt/index.js");

// validations
const {
  addUserValidation,
  getAllUsersValidation,
  getByNicknameValidation,
  updateUserValidation,
  deleteByNicknameValidation,
} = require("./utils/requestValidations");
const app = express();
require("dotenv").config();
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
  authenticateToken,
  updateUserValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await handleUpdateUser(req, res);
      res.status(200).json({ message: "user updated" });
    } catch (err) {
      if (err.message === "User has been modified since last retrieved") {
        res.status(412).json({ message: err.message });
      } else res.status(500).json({ message: err.message });
    }
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
      res.set("Last-Modified", user.updated_at);
      res.status(200).json({ message: user });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
);
// delete users
app.delete(
  `/${appName}/${appVersion}/users`,
  authenticateToken,
  async (req, res) => {
    try {
      await handleDeleteUsers();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
);
// delete user by name
app.delete(
  `/${appName}/${appVersion}/user`,
  authenticateToken,
  deleteByNicknameValidation,
  async (req, res) => {
    try {
      await handleDeleteUser(req);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
);

// login
app.post(
  `/${appName}/${appVersion}/login`,
  authMiddleware,
  async (req, res) => {
    try {
      const user = await handleLogin(req);
      const token = generateAccessToken(user);
      res.status(200).json({ token });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: err });
    }
  },
);

app.post(
  `/${appName}/${appVersion}/protected`,
  authenticateToken,
  async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({ user });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: err });
    }
  },
);

app.listen(port, () => {
  logger.info(`\n\nServer running on port ${port}.\n\n`);
});
