const { body } = require("express-validator/check");

exports.validate = (method) => {
  switch (method) {
    case "addUser": {
      return [
        body("nickname", "nickname doesn't exists").exists(),
        body("password", "password is missing").exists().isString(),
        body("lastname")
          .optional()
          .isString()
          .withMessage("lastname must be a string"),
        body("firstname")
          .optional()
          .isString()
          .withMessage("firstname must be a string"),
      ];
    }
  }
};
