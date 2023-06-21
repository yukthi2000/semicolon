const express = require("express");
const router = express.Router();
const { Trip } = require("../models");

router.get("/", async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve trips" });
  }
});

router.post("/", async (req, res) => {
  try {
    const tripData = req.body;
    const createdTrip = await Trip.create(tripData);
    res.status(201).json(createdTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a trip" });
  }
});

module.exports = router;

// router.get("/location", async (req, res) => {
//   try {
//     const location = req.query.location; // Retrieve the location from the query string
//     const ratings = await Ratings.findAll({
//       where: { location: location },
//     });

//     res.json(ratings);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.get("/", async (req, res) => {
//   // const location = req.query.location; // Retrieve the location from the query string
//   const ratings = await Ratings.findAll();

//   res.json(ratings);
// });

// router.post("/", async (req, res) => {
//   const post = req.body;
//   await Ratings.create(post);
//   res.json(post);
// });


 //no of users display in Admin module
 router.get("/trip-count", async (req, res) => {
  try {
    const count = await Trip.count();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while counting users" });
  }
});