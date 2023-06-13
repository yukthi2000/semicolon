const express = require("express");
const router = express.Router();
const { Locations } = require("../models");

let currentId = 100; // Initialize a variable to track the current ID

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const names = data.name; // Assuming the array of names is provided as "name" in req.body

    const createdLocations = [];

    for (const name of names) {
      const location = await Locations.create({
        id: currentId, // Assign the current ID to each location object
        name,
      });
      createdLocations.push(location);
    }

    currentId++; // Increment the current ID for the next batch of names

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
