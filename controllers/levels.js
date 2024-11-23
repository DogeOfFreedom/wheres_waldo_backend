const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

const getLevels = expressAsyncHandler(async (req, res) => {
  const levels = await prisma.level.findMany({
    select: {
      name: true,
      img: true,
    },
  });
  res.json(levels);
});

const getSpecificLevel = expressAsyncHandler(async (req, res) => {
  const { name } = req.params;
  const level = await prisma.level.findFirst({
    where: {
      name,
    },
  });
  res.json(level);
});

module.exports = { getLevels, getSpecificLevel };
