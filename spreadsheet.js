const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

const credentials = require("./client_secret.json");

async function accessSpreadsheet() {
  const document = new GoogleSpreadsheet(
    "1eyZDlsX8ksbJ7kmsrRFwm44zaMiCnp5u1e0M2jhBEqw"
  );
  await promisify(document.useServiceAccountAuth)(credentials);
  const info = await promisify(document.getInfo)();
  const sheet = info.worksheets[0];
  console.log(sheet.title, sheet.rowCount);
}
