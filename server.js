const express = require("express");
const logger = require("./utils/logger");

// request handlers
const {
  handleAddUser,
  handleGetByNickname,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUsers,
  handleDeleteUser,
  handleLogin,
  handleVote,
} = require("./utils/requestHandlers");

// error responses
const {
  postVoteErrorResponse,
  updateUserErrorResponse,
} = require("./utils/responses");
const {
  errorResponse500,
} = require("./utils/responses/genericStatusResponses");
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
  voteValidation,
} = require("./utils/requestValidations");

const addCalculateRatingsCronJob = require("./utils/addCalculateRatingsCronJob");

// app
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
    errorResponse500({ err, res });
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
    try {
      await handleUpdateUser(req, res);
      res.status(200).json({ message: "user updated" });
    } catch (err) {
      updateUserErrorResponse({ err, res });
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
      errorResponse500({ err, res });
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
      errorResponse500({ err, res });
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
      errorResponse500({ err, res });
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
      errorResponse500({ err, res });
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
      const userId = req.body.userId;
      const token = generateAccessToken({ user, userId });
      res.status(200).json({ token });
    } catch (err) {
      errorResponse500({ err, res });
    }
  },
);

app.post(
  `/${appName}/${appVersion}/vote`,
  authenticateToken,
  voteValidation,
  async (req, res) => {
    try {
      const valResult = await validationResult(req);
      if (valResult && valResult.errors.length > 0) {
        return res.status(400).json({ errors: valResult.errors });
      }
      const result = await handleVote(req, res);
      postVoteErrorResponse({ result, res });
    } catch (err) {
      errorResponse500({ err, res });
    }
  },
);

app.listen(port, () => {
  addCalculateRatingsCronJob();
  logger.info(`\n\nServer running on port ${port}.\n\n`);
});
