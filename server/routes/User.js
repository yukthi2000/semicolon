const express = require('express');
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken")
 

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
      { email: user.email, id: user.id },
      "importantsecret"
    );

    res.json({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
