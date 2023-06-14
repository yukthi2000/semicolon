const express = require("express");
const router = express.Router();
const { Locations } = require("../models");

let currentId = 100; // Initialize a variable to track the current ID

router.post("/", async (req, res) => {
  const locations = req.body;
  await Locations.create(locations);
  res.json(Locations);
});

router.get("/a", (req, res) => {
  res.json("hello world");
});

module.exports = router;
