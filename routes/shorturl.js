const express = require("express");
const { createShortUrl } = require("../controllers/shortnerController");
const route = express.Router();

route.post("/create", createShortUrl);

module.exports = route;
