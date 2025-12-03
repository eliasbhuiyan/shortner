const express = require("express");
const route = express.Router();
const authRoute = require("./auth");
const shortUrlRoute = require("./shorturl");

route.get("/", (req, res) => {
  res.status(200).send("Hello");
});

route.use("/auth", authRoute);
route.use("/url", shortUrlRoute);

route.use((req, res) => {
  res.send("404 not found!");
});

module.exports = route;
