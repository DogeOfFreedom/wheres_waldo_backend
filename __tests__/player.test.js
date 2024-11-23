import { describe, expect, test, vi } from "vitest";
const express = require("express");
const request = require("supertest");
const app = express();

app.use(express.json());
const general = require("../routers/general");
app.use("/", general);

test("/test", async () => {
  const res = await request(app).get("/test");
  expect(res.status).toEqual(200);
});

test("/test but wrong", async () => {
  const res = await request(app).get("/test");
  expect(res.status).not.toEqual(404);
});

describe("/verify", () => {
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
