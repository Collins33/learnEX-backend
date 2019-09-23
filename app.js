const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./API/models/student");
const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

const key = process.env.PRIVATE_KEY;
const email = process.env.CLIENT_EMAIL;

const secondCredentials = {
  client_email: email,
  private_key: key
};
require("dotenv").config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

function saveStudentData(studentData) {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: studentData.student,
    email: studentData.email,
    ip1: studentData.ip131,
    ip2: studentData.ip222,
    ip3: studentData.ip322,
    ip4: studentData.ip428,
    attendance: studentData.attendance,
    firstRecommendation: studentData.firstrecommendation,
    firstRecommendationReason: studentData.reasonfirstrecommendation,
    finalRecommendation: studentData.finalrecommendation,
    finalRecommendationReason: studentData.reasonfinalrecommendation
  });
  student
    .save()
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

async function accessSpreadsheet() {
  const document = new GoogleSpreadsheet(
    "1eyZDlsX8ksbJ7kmsrRFwm44zaMiCnp5u1e0M2jhBEqw"
  );
  await promisify(document.useServiceAccountAuth)(secondCredentials);
  const info = await promisify(document.getInfo)();
  const sheet = info.worksheets[0];
  const rows = await promisify(sheet.getRows)({
    offset: 1
  });
  rows.forEach(element => {
    saveStudentData(element);
  });
}
accessSpreadsheet();

module.exports = app;
