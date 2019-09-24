const nodemailer = require("nodemailer");
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
/**
 * The transporter service
 * informs nodemailer the service to use
 */
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPassword
  }
});

module.exports = (
  studentEmail,
  firstrecommendation,
  finalrecommendation,
  res
) => {
  if (finalrecommendation === "No" && firstrecommendation === "No") {
    let mailOptions = {
      from: "collinsnjau39@gmail.com",
      to: studentEmail,
      subject: "MORINGA SCHOOL ASSESSMENT",
      text:
        "You are not on track. You are advised to discuss this with your technical mentor"
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        const message = {
          status: "Ok",
          description: "Emails were not sent successfully"
        };
        res.status(500).json(message);
      } else {
        const message = {
          status: "Ok",
          description: "Emails were sent successfully"
        };
        res.status(200).json(message);
      }
    });
  } else if (finalrecommendation === "Yes" && firstrecommendation === "Yes") {
    let mailOptions = {
      from: "collinsnjau39@gmail.com",
      to: studentEmail,
      subject: "MORINGA SCHOOL ASSESSMENT",
      text: "You are currently on track with your work. Keep up the good work"
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        const message = {
          status: "Ok",
          description: "Emails were not sent successfully"
        };
        res.status(500).json(message);
      } else {
        const message = {
          status: "Ok",
          description: "Emails were sent successfully"
        };
        res.status(200).json(message);
      }
    });
  }
};
