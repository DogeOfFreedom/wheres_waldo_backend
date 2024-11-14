const router = require("express").Router();
const { populate } = require("dotenv");
const { getAllPlayers, addNewPlayer } = require("../controllers/player");
const { validatePlayer } = require("./validation/validation");
const { checkForErrors } = require("./validation/errors");

if (process.env.ENV === "development") {
  router.get("/populate", populate);
}

router.get("/players", getAllPlayers);

router.post("/players", validatePlayer, checkForErrors, addNewPlayer);

module.exports = router;
