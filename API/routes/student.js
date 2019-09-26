const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student");

router.get("/", StudentController.student_get_all);
router.get("/:studentId", StudentController.student_get_one);
module.exports = router;
