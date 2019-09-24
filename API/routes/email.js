const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/email");

router.get("/send", EmailController.emails_send_all);

module.exports = router;
