const express = require("express");
const { signup, login, getProfile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/signup", signup);

route.post("/login", login);

route.get("/getprofile", authMiddleware, getProfile);

module.exports = route;
