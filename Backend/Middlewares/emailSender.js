const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendNotificationEmail = (user,password) => {
  const mailOptions = {
    from: "lafkirrabie2000@gmail.com", // Sender's email address
    to: user.email, // Recipient's email address
    subject: "Welcome to our website", // Email subject
    text: `Welcome to our community, ${user.first_name}!\n\nYour account has been successfully created.\n\n 
    You can log in your account by using \n\n Username: ${user.user_name} \n\n Password: ${password}   `, // Email text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  sendNotificationEmail,
};
