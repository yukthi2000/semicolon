const express = require("express");
const router = express.Router();
const { Locations } = require("../models");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const names = data.name; // Assuming the array of names is provided as "name" in req.body
    const locations = names.map((name) => ({ name })); // Convert each name to an object with the "name" property
    const createdLocations = await Locations.bulkCreate(locations);
    res.json(createdLocations);
  } catch (error) {
    console.error("Error saving locations data:", error);
    res.status(500).send(error);
  }
});


router.get("/a", (req, res) => {
  res.json("hello world");
});

module.exports = router;

