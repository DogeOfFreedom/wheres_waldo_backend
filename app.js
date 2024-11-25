/* eslint-disable import/newline-after-import */
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

const router = require("./routers/general");
app.use(router);

// error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (process.env.ENV === "testing") {
    res.status(500).send(err);
  }
  res.status(500).send("Internal Server Error");
});
