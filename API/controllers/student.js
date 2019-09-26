const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const environment = process.env.ENVIRONMENT;
let url;
if (environment === "local") {
  url = "http://localhost:3000";
} else if (environment === "production") {
  url = "https://learnexserver.herokuapp.com";
}

// import the population schema
const Student = require("../models/student");

/**
 * @method student_get_all
 * @summary - return all student details
 * @param request body, response body
 * @returns json message
 */
exports.student_get_all = (req, res, next) => {
  Student.find()
    .select("name email _id")
    .then(students => {
      const response = {
        count: students.length,
        students: students.map(student => {
          return {
            name: student.name,
            email: student.email,
            _id: student._id,
            request: {
              type: "GET",
              description: "Get single student information",
              url: url + "/api/v1/students/" + student._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

/**
 * @method student_get_one
 * @summary - returns a single student
 * @param request body, response body
 * @returns json message
 */
exports.student_get_one = (req, res, next) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .then(student => {
      if (student) {
        const response = {
          name: student.name,
          email: student.email,
          ip1: student.ip1,
          ip2: student.ip2,
          ip3: student.ip3,
          ip4: student.ip4,
          attendance: student.attendance,
          firstRecommendation: student.firstRecommendation,
          firstRecommendationReason: student.firstRecommendationReason,
          finalRecommendation: student.finalRecommendation,
          finalReccomendationReason: student.finalRecommendationReason,
          _id: student._id
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Student does not exist"
        });
      }
    })
    .catch(error => {
      console.log(error, "<><><>");
      res.status(500).json({ error: error });
    });
};
