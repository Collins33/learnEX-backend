const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const accessSpreadsheet = require("./SPREADSHEETS/spreadsheets");

require("dotenv").config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const emailRoutes = require("./API/routes/email");

/**
 * Make database connection
 */
const environment = process.env.ENVIRONMENT;
if (environment === "local" || environment === "production") {
  mongoose.connect(process.env.MONGO_DATABASE_URL, { useNewUrlParser: true });
} else if (environment === "testing") {
  mongoose.connect(process.env.MONGO_DATABASE_TEST_URL, {
    useNewUrlParser: true
  });
}

/**
 * Use the default node js promise
 */
mongoose.Promise = global.Promise;

/**
 * Give access control
 * to any client
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/**
 * Welcome route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the learnEX API"
  });
});

app.use("/api/v1/emails", emailRoutes);

// accessSpreadsheet();

module.exports = app;
