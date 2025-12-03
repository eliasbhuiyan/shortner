const express = require("express");
const dbConfig = require("./dbConfig");
require("dotenv").config();
const route = require("./routes");
const app = express();
app.use(express.json());
dbConfig();
app.use(route);
app.listen(8000, () => {
  console.log("Server is running");
});
