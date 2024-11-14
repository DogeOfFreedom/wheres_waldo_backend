const expressAsyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { leaderboard } = require("../placeholder_data/leaderboard");

const prisma = new PrismaClient();

const populate = expressAsyncHandler(async (req, res) => {
  await prisma.player.createMany({
    data: leaderboard,
  });
  res.status(200).send("Populated");
});

module.exports = { populate };
