const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendNotificationEmail = (user,password) => {
  const mailOptions = {
    from: "intellihome23@outlook.com", // Sender's email address
    to: user.email, // Recipient's email address
    subject: "Welcome to our website", // Email subject
    text: `Welcome to our community, ${user.first_name}!\nYour account has been successfully created.\n\n 
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



const sendActivationEmail = async (email, activationToken) => {
  try {
    const ngrokUrl = 'https://381a-196-127-131-27.ngrok.io'; // Replace this with your Ngrok URL

    // Email content with Ngrok URL
    const mailOptions = {
      from: 'intellihome23@outlook.com',
      to: email,
      subject: 'Account Activation',
      text: `To activate your account, click on the following link: ${ngrokUrl}/v1/customers/activate/${activationToken}`
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = { sendNotificationEmail,sendActivationEmail };





