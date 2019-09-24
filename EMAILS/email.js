const nodemailer = require("nodemailer");
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
// /**
//  * This informs nodemailer who is
//  * sending what and to who
//  */

// let mailOptions = {
//   from: "collinsnjau39@gmail.com",
//   to: "collins.muru@andela.com",
//   subject: "Hello muchahos",
//   text: "It was nice knowing you"
// };

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

module.exports = studentEmail => {
  let mailOptions = {
    from: "collinsnjau39@gmail.com",
    to: studentEmail,
    subject: "Hello muchahos",
    text: "It was nice knowing you"
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error, "<><><><><><><><<>");
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
