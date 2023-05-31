const deleteUserByNameErrorResponse = async ({ err, res }) => {
  switch (err.message) {
    default:
      res.status(500).json({ message: err.message });
      break;
  }
};

module.exports = deleteUserByNameErrorResponse;
