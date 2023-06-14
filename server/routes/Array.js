const express = require("express");
const router = express.Router();
const { Array } = require("../models");

let currentId = 100; // Initialize a variable to track the current ID

router.post("/", async (req, res) => {
  const array = req.body;
  await Array.create(array);
  res.json(array);
});

router.get("/a", (req, res) => {
  res.json("hello world");
});

module.exports = router;
