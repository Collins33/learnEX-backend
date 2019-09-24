const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const emailSent = require("../../EMAILS/email");

// import student schema
const Student = require("../models/student");

/**
 * @method emails_send_all
 * @summary - send emails to all students
 * @param request body, response body
 * @returns json message
 */
exports.emails_send_all = async (req, res, next) => {
  Student.find()
    .then(response => {
      response.forEach(student => {
        const email = student.email;
        const firstRecommendation = student.firstRecommendation;
        const finalRecommendation = student.finalRecommendation;
        emailSent(email, firstRecommendation, finalRecommendation, res);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
