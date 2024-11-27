import { beforeAll, beforeEach, describe, expect, test } from "vitest";
const express = require("express");
const request = require("supertest");
const app = express();

app.use(express.json());
const general = require("../routers/general");
app.use("/", general);

describe("GET /populate", () => {
  test("populate database", async () => {
    const res = await request(app).get("/populate");
    expect(res.status).toEqual(200);
  });
});

describe("POST /verify", () => {
  const answer = {
    name: "Starlit Street",
    x: 2109,
    y: 833,
  };
  const proxAnswer = {
    name: "Starlit Street",
    x: 2079,
    y: 833,
  };
  const wrongAnswer = {
    name: "Starlit Street",
    x: 0,
    y: 0,
  };

  test("Returns false when answer is outside bounding box", async () => {
    const res = await request(app).post("/verify").send(wrongAnswer);
    expect(res.status).toEqual(200);
    expect(res.body.inside).toEqual(false);
  }),
    test("Returns true when player choice is the answer exactly", async () => {
      const res = await request(app).post("/verify").send(answer);
      expect(res.status).toEqual(200);
      expect(res.body.inside).toEqual(true);
    }),
    test("Returns true when answer is within 30 pixels of the player choice", async () => {
      const res = await request(app).post("/verify").send(proxAnswer);
      expect(res.status).toEqual(200);
      expect(res.body.inside).toEqual(true);
    });
});

describe("POST /players - fails", () => {
  test("ms is negative", async () => {
    const res = await request(app)
      .post("/players")
      .send({
        name: "Jane",
        anon: false,
        time: {
          minutes: "02",
          seconds: "34",
          miliseconds: "-12",
        },
      });
    expect(res.status).toEqual(400);
    expect(res.body.errors[0].msg).toEqual("Invalid ms value");
  }),
    test("ms is greater than 99", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          name: "Jane",
          anon: false,
          time: {
            minutes: "02",
            seconds: "34",
            miliseconds: "102",
          },
        });
      expect(res.status).toEqual(400);
      expect(res.body.errors[0].msg).toEqual("Invalid ms value");
    }),
    test("sec is negative", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          name: "Jane",
          anon: false,
          time: {
            minutes: "02",
            seconds: "-34",
            miliseconds: "12",
          },
        });
      expect(res.status).toEqual(400);
      expect(res.body.errors[0].msg).toEqual("Invalid sec value");
    }),
    test("sec is greater than 59", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          name: "Jane",
          anon: false,
          time: {
            minutes: "02",
            seconds: "60",
            miliseconds: "12",
          },
        });
      expect(res.status).toEqual(400);
      expect(res.body.errors[0].msg).toEqual("Invalid sec value");
    }),
    test("min is negative", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          name: "Jane",
          anon: false,
          time: {
            minutes: "-02",
            seconds: "34",
            miliseconds: "12",
          },
        });
      expect(res.status).toEqual(400);
      expect(res.body.errors[0].msg).toEqual("Invalid min value");
    }),
    test("name is empty and user is not anon", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          name: "",
          anon: false,
          time: {
            minutes: "02",
            seconds: "34",
            miliseconds: "12",
          },
        });
      expect(res.status).toEqual(400);
      expect(res.body.errors[0].msg).toEqual("Name cannot be empty");
    }),
    test("name is more than 30 characters", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          name: "asfhasgfkahsgshadhahagakjhgkjshgkjshsdhg",
          anon: false,
          time: {
            minutes: "02",
            seconds: "34",
            miliseconds: "12",
          },
        });
      expect(res.status).toEqual(400);
      expect(res.body.errors[0].msg).toEqual(
        "Name cannot be more than 30 characters"
      );
    });
});

describe("POST /players - success", () => {
  const levelId = "bdc13929-bd40-4d45-a94b-c46353ce7f35";

  const getPlayerRank = (players, name, anon) => {
    let targetName = anon ? null : name;
    for (let player of players) {
      if (player.name === targetName) {
        return player.rank;
      }
    }
  };

  beforeEach(async () => {
    const res = await request(app).get("/populate"); // Reset database to default state
    expect(res.status).toEqual(200);
  });

  test.skip("player is not anon", async () => {
    const data = {
      name: "Ranny",
      anon: false,
      time: {
        minutes: "00",
        seconds: "10",
        miliseconds: "12",
      },
      // Starlit Street
      levelId,
    };

    const postRes = await request(app).post("/players/").send(data); // Send new data
    if (postRes.status === 500) {
      console.log(postRes.error);
    }
    expect(postRes.status).toEqual(200);

    const getRes = await request(app).get("/players/" + levelId);
    expect(getRes.status).toEqual(200);

    const rank = getPlayerRank(getRes.body, data.name, data.anon);
    expect(rank).toEqual(2);
  });
  test("player is anon", async () => {
    const data = {
      name: null,
      anon: true,
      time: {
        minutes: "09",
        seconds: "10",
        miliseconds: "12",
      },
      // Starlit Street
      levelId: "bdc13929-bd40-4d45-a94b-c46353ce7f35",
    };

    const postRes = await request(app).post("/players").send(data); // Send new data
    expect(postRes.status).toEqual(200);

    const getRes = await request(app).get("/players/" + levelId);
    expect(getRes.status).toEqual(200);

    const rank = getPlayerRank(getRes.body, data.name, data.anon);
    expect(rank).toEqual(3);
  }, 5000000);
});
