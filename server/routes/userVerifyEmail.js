const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
const uuid = require("uuid");

// Reset token data structure
const resetTokens = [];

const UserVerifyEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ldsliyanage99@gmail.com",
    pass: "mfnwugjwlawbewkd",
  },
});

UserVerifyEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

function generateResetToken() {
  // Generate a unique token using the uuid library
  return uuid.v4();
}

// Get the expiry time for the reset token (5 minutes from now)
function getExpiryTime() {
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 2 * 60 * 1000); // Add 5 minutes in milliseconds
  return expiryTime;
}

// Validate the reset token and its expiry time
function validateResetToken(token) {
  const resetToken = resetTokens.find((rt) => rt.token === token);

  if (resetToken && resetToken.expiryTime > new Date()) {
    return true; // Token is valid and not expired
  }

  return false; // Token is invalid or expired
}

router.post("/VerifyLink", async (req, res) => {
  const email = req.body.email;

  // // Find the user with the given email
  // const user = await User.findOne({ where: { email: email } });
  // console.log(user)

  const token = generateResetToken();
  const expiryTime = getExpiryTime();
  // await User.update({resetToken:token, expiryTime:expiryTime}, {where:{id:user.id}})
  // // Store the reset token and its expiry time in the resetTokens array
  // resetTokens.push({ token, expiryTime });

  const resetLink = `http://localhost:3000/login?token=${token}`; // Replace with your actual reset password page URL

  const mail = {
    from: "ldsliyanage99@gmail.com", // Your email address
    to: email, // User's email address
    subject: "Email varification",
    html: `
             <p>Please click the following link to veryfy your account:</p>
          <a href="${resetLink}">Reset Password</a>
             `,
  };

  UserVerifyEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Verify link sent to your email" });
    }
  });
});



module.exports = router;
