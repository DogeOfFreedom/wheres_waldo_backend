const expressAsyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { players } = require("../data/players");
const { levels } = require("../data/levels");

const prisma = new PrismaClient();

const populate = expressAsyncHandler(async (req, res) => {
  await prisma.level.deleteMany({});
  await prisma.player.deleteMany({});

  await prisma.level.createMany({
    data: levels,
  });
  await prisma.player.createMany({
    data: players,
  });

  res.sendStatus(200);
});

module.exports = { populate };
