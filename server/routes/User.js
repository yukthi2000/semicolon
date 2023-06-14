const express = require('express');
const router = express.Router();
const {  sequelize, User  } = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} = require ('../middlewares/AuthMiddleware');
const { sign } = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


router.post("/", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ where: { email: email } });
    console.log(user)

    // Check if the user exists
    if (!user) {
      return res.json({ error: "User doesn't exist" });
    }

    // Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ error: "Wrong username and password combination" });
    }

    // Create a JWT token for the user
    const accessToken = sign(
      { email: user.email, id: user.id, name:user.name },
      "importantsecret"
    );

    res.json({ token: accessToken,email:email, id:user.id, name:user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/auth", validateToken, (req, res)=>{
  res.json(req.user)
})






// // Define the POST /reset-password route
// router.post('/reset-password', async (req, res) => {
//   const { newPassword, confirmPassword } = req.body;
//   const userId = req.user.id; // Assuming you have implemented user authentication

//   // Check if the newPassword and confirmPassword match
//   if (newPassword !== confirmPassword) {
//     return res.status(400).json({ error: 'Passwords do not match' });
//   }

//   try {
//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the database
//     await User.update(
//       { password: hashedPassword },
//       { where: { id: userId } }
//     );

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });


// POST /api/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    // Generate a JWT token with a reset password payload
    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });

    // Create a password reset link
    const resetLink = `http://your-frontend-app/reset-password?token=${token}`;


    // Send the reset link to the user's email address
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ldsliyanage99@gmail.com',
        pass: 'Diliya#99',
      },
    });

    const mailOptions = {
      from: 'ldsliyanage99@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset link sent to your email address.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
