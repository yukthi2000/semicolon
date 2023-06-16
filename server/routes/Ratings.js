const express = require("express");
const router = express.Router();
const { Ratings } = require("../models");

router.get("/location", async (req, res) => {
  try {
    const location = req.query.location; // Retrieve the location from the query string
    const ratings = await Ratings.findAll({
      where: { location: location },
    });

    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  // const location = req.query.location; // Retrieve the location from the query string
  const ratings = await Ratings.findAll();

  res.json(ratings);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Ratings.create(post);
  res.json(post);
});
module.exports = router;
