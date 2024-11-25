const router = require("express").Router();
const { populate } = require("../controllers/populate");
const {
  getAllPlayers,
  addNewPlayer,
  verifyPlayerChoice,
} = require("../controllers/player");
const { validatePlayer } = require("./validation/validation");
const { checkForErrors } = require("./validation/errors");
const { getLevels, getSpecificLevel } = require("../controllers/levels");

if (process.env.ENV === "development" || process.env.ENV === "testing") {
  router.get("/populate", populate);
}

router.get("/players", getAllPlayers);

router.post("/players", validatePlayer, checkForErrors, addNewPlayer);

router.get("/levels", getLevels);

router.get("/levels/:name", getSpecificLevel);

router.post("/verify", verifyPlayerChoice);

module.exports = router;
