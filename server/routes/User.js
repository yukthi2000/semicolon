const express = require('express');
const router = express.Router();
const {  sequelize, User  } = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} = require ('../middlewares/AuthMiddleware');
const { sign } = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


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



//profile basic info fetching
router.get("/basicInfo/:id", async(req, res)=>{
      const id = req.params.id;
      const basicInfo= await User.findByPk(id, {attributes: {exclude: ['password'] }
    });
    res.json(basicInfo)
})

 module.exports = router;
