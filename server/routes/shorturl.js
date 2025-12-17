const express = require("express");
const {
  createShortUrl,
  getShortUrls,
} = require("../controllers/shortnerController");
const { authMiddleware, isAuthentic } = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/create", isAuthentic, createShortUrl);
route.get("/getall", authMiddleware, getShortUrls);

module.exports = route;
