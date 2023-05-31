const getAllUsersErrorResponse = async ({ err, res }) => {
  switch (err.message) {
    default:
      res.status(500).json({ message: err.message });
      break;
  }
};

module.exports = getAllUsersErrorResponse;
