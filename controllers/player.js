const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");
const { insideSquare } = require("./square");

const prisma = new PrismaClient();

const getAllPlayers = expressAsyncHandler(async (req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});

const addNewPlayer = expressAsyncHandler(async (req, res) => {
  const { anon, time } = req.body;
  const name = anon ? null : req.body.name;

  const players = await prisma.player.findMany({
    orderBy: {
      rank: "asc",
    },
  });

  let rank;
  let insertNewPlayer = true;
  for (let i = 0; i < players.length; i++) {
    if (insertNewPlayer) {
      const curr = players[i];
      const newIsFaster = compareTime(time, curr);
      if (newIsFaster === 1) {
        rank = curr.rank;
        curr.rank += 1;
        insertNewPlayer = false;
      }
      if (newIsFaster === 0) {
        rank = curr.rank + 1;
        insertNewPlayer = false;
      }
      if (i + 1 === players.length) {
        rank = players.length + 1;
      }
    } else {
      players[i].rank += 1;
    }
  }

  const newPlayer = {
    rank,
    name,
    time,
  };

  // Update all existing players
  await Promise.all(
    players.map((player) =>
      prisma.player.update({
        where: {
          id: player.id,
        },
        data: {
          rank: player.rank,
        },
      })
    )
  );

  // Insert new player
  await prisma.player.create({
    data: newPlayer,
  });

  res.sendStatus(200);
});

// -1 = time1 is slower
// 0  = equal time
// 1  = time1 is faster
const compareTime = (time1, time2) => {
  const time1Components = time1.split(":");
  const min1 = Number(time1Components[0]);
  const sec1 = Number(time1Components[1]);
  const ms1 = Number(time1Components[2]);
  const time2Components = time2.split(":");
  const min2 = Number(time2Components[0]);
  const sec2 = Number(time2Components[1]);
  const ms2 = Number(time2Components[2]);

  if (min1 > min2) {
    return 1;
  }
  if (min1 < min2) {
    return -1;
  }
  if (min1 === min2) {
    if (sec1 > sec2) {
      return 1;
    }
    if (sec1 < sec2) {
      return -1;
    }
    if (sec1 === sec2) {
      if (ms1 > ms2) {
        return 1;
      }
      if (ms1 < ms2) {
        return -1;
      }
    }
  }
  return 0;
};

const verifyPlayerChoice = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const coords = {
    x: req.body.x,
    y: req.body.y,
  };

  const answer = await prisma.level.findFirst({
    where: {
      name,
    },
    select: {
      location: true,
      dimensions: true,
    },
  });

  if (insideSquare(coords, answer)) {
    return res.json({
      dimensions: answer.dimensions,
      inside: true,
    });
  }
  return res.json({
    inside: false,
  });
});

module.exports = { getAllPlayers, addNewPlayer, verifyPlayerChoice };
