const { body } = require("express-validator");

const validatePlayer = [
  body("name").custom((value, { req }) => {
    if (req.body.anonymous) {
      // anon user
      return true;
    }

    switch (value) {
      case value.length <= 0:
        throw new Error("Name cannot be empty");
      case value.length > 30:
        throw new Error("Name cannot be more than 30 characters");
      default:
        return true;
    }
  }),
];

module.exports = { validatePlayer };
