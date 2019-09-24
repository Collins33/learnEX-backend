const emailSent = require("../EMAILS/email");
const Student = require("../API/models/student");
const GoogleSpreadsheet = require("google-spreadsheet");
const mongoose = require("mongoose");
const { promisify } = require("util");

const key = process.env.PRIVATE_KEY;
const email = process.env.CLIENT_EMAIL;

const secondCredentials = {
  client_email: email,
  private_key: key
};

function saveStudentData(studentData) {
  Student.remove({}, err => {
    if (err) console.log(err);
  });
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

module.exports = async () => {
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
};
