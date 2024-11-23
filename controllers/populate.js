const expressAsyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { leaderboard } = require("../data/leaderboard");
const { levels } = require("../data/levels");

const prisma = new PrismaClient();

const populate = expressAsyncHandler(async (req, res) => {
  await prisma.player.deleteMany({});
  await prisma.level.deleteMany({});

  await prisma.player.createMany({
    data: leaderboard,
  });
  await prisma.level.createMany({
    data: levels,
  });
  res.status(200).send("Populated");
});

module.exports = { populate };
