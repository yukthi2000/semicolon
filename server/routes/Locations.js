const express = require("express");
const router = express.Router();
const { Locations } = require("../models");

router.get("/", async (req, res) => {
  try {
    const locations = await Locations.findAll();
    console.log(req.tripId);
    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const locations = req.body;
    const tripId = req.tripId;
    console.log(tripId);
    const createdlocations = await Locations.create(locations);
    res.status(201).json(createdlocations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed" });
  }
});

module.exports = router;
