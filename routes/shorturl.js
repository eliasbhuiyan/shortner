const express = require("express");
const route = express.Router();

route.post("/shorturl", () => {
  console.log("login");
});

module.exports = route;
