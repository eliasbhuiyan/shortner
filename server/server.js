const express = require("express");
const dbConfig = require("./dbConfig");
require("dotenv").config();
const route = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { isValidUrl } = require("./utils/validations");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dbConfig();
app.use(route);

app.listen(8000, () => {
  console.log("Server is running");
});
