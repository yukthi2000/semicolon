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
    //const tripId = req.tripId;
    console.log(tripId);
    const createdlocations = await Locations.create(locations);
    res.status(201).json(createdlocations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed" });
  }
});

router.post("/locations/:tripid", async (req, res) => {
  try {
    const tripId = req.params.tripid;
    const locationsObject = req.body;
    const locationsArray = Object.values(locationsObject);

    // console.log('Received locations:', locationsArray);

    const createdLocations = await Promise.all(
      locationsArray.map((locationData) => {
        return Locations.create({ name: locationData, tripId });
      })
    );

    // console.log('Created locations:', createdLocations);

    res.status(200).json({
      message: "Locations saved successfully",
      // locations: createdLocations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save locations" });
  }
});


module.exports = router;
