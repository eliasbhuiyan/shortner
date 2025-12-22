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
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
dbConfig();
app.use(route);

app.listen(8000, () => {
  console.log("Server is running");
});
