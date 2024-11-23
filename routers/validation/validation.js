const { body } = require("express-validator");

const validatePlayer = [
  body("name").custom((value, { req }) => {
    if (req.body.anon) {
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
  body("time").custom((value) => {
    const arr = value.split(":");
    const min = Number(arr[0]);
    const sec = Number(arr[1]);
    const ms = Number(arr[2]);
    const total = min + sec + ms;

    if (total < 0) {
      throw new Error("Time cannot be negative");
    }
  }),
];

module.exports = { validatePlayer };
