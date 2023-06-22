const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
      password: hashedPassword,
      userType: "premium",
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.json({ error: "Passwords do not match" });
    }

    // Find the user with the given email
    const user = await User.findOne({ where: { email: email } });
    console.log(user);

    // Check if the user exists
    if (user) {
      return res.json({ error: "Email already exist" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      userType: "admin",
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//delete admin from admin table
router.delete("/delete-admin/:id", async (req, res) => {
  try {
    const adminUserId = req.params.id;
    const deletedAdmin = await User.destroy({ where: { id: adminUserId } });
    if (deletedAdmin) {
      res.sendStatus(204); // Return a successful response with status code 204 (No Content)
    } else {
      res.sendStatus(404); // Return a not found response with status code 404 (Not Found)
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the review" });
  }
});

//login function for users
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ where: { email: email } });
    console.log(user);

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
      {
        email: user.email,
        id: user.id,
        name: user.name,
        userType: user.userType,
      },
      "importantsecret"
    );

    res.json({
      token: accessToken,
      email: email,
      id: user.id,
      name: user.name,
      userType: user.userType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

//profile basic info fetching
router.get("/basicInfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
});

//admin info fetch in admin page
router.get("/admin-info", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        userType: "admin",
      },
      attributes: ["name", "email", "userType", "id"],
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//no of users display in Admin module
router.get("/user-count", async (req, res) => {
  try {
    const count = await User.count();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while counting users" });
  }
});

//update public user's profile
router.put("/updateProfile/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, userType } = req.body;

  try {
    // Find the user by ID and update their profile
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile fields
    user.name = name;
    user.email = email;
    user.userType = userType;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete user account by click delete button
router.delete("/deleteAccount/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and delete their account
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user's account
    await user.destroy();

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
