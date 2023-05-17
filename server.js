const express = require("express");
const {
  handleAddUser,
  handleGetByNickname,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUsers,
} = require("./utils/requestHandlers");
const app = express();
require("dotenv").config();
// const logger = require("./utils/logger");

const port = process.env.PORT || 1337;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the Bot API." });
});

app.post(`/`, (req, res) => {
  res.status(200).json({ message: "home" });
});
app.post(`/addUser`, (req, res) => {
  handleAddUser(req.body);
  res.status(200).json({ message: "addUser" });
});
app.post(`/updateUser`, async (req, res) => {
  const updatedUser = await handleUpdateUser(req.body);
  if (updatedUser) {
    res.status(200).json({ message: "user updated", updatedUser });
  } else {
    res.status(401).send("Authentication failed");
  }
});
app.post(`/getUsers`, async (req, res) => {
  const users = await handleGetUsers(req.body);
  res.status(200).json({ message: users });
});
app.post(`/getByNickname`, async (req, res) => {
  const user = await handleGetByNickname(req.body);
  res.status(200).json({ message: user });
});
app.post(`/deleteUsers`, async (req, res) => {
  await handleDeleteUsers();
  res.status(200).json({ message: "deleted all users" });
});
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`\n\nServer running on port ${port}.\n\n`);
});
