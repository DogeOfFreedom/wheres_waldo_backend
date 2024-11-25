const { body } = require("express-validator");

const validatePlayer = [
  body("name").custom((value, { req }) => {
    if (req.body.anon) {
      // anon user
      return true;
    }

    if (value.length <= 0) {
      throw new Error("Name cannot be empty");
    }

    if (value.length > 30) {
      throw new Error("Name cannot be more than 30 characters");
    }

    return true;
  }),
  body("time").custom((arr) => {
    const min = Number(arr.minutes);
    const sec = Number(arr.seconds);
    const ms = Number(arr.miliseconds);

    if (ms < 0 || ms > 99) {
      throw new Error("Invalid ms value");
    }

    if (sec < 0 || sec > 59) {
      throw new Error("Invalid sec value");
    }

    if (min < 0) {
      throw new Error("Invalid min value");
    }
    return true;
  }),
];

module.exports = { validatePlayer };
