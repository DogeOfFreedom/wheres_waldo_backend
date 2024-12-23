const { validationResult } = require("express-validator");

const checkForErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  }
  return next();
};

module.exports = { checkForErrors };
