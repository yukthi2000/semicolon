const express = require('express');
const router = express.Router();
const {WeatherScore} = require("../models");

router.get("/:tripID/:location", async (req, res) => {
    //const { tripID } = req.params;
    const { tripID, location } = req.params;
    const weatherScoreResponse = await WeatherScore.findOne({
  where: {
    tripID,
    location,
  },
});

    if (!weatherScoreResponse) {
      return res.status(404).json({ error: "Weather score not found" });
    }
    
    res.json(weatherScoreResponse);
  });

router.post("/", async (req,res)=>{
    const weatherScore = req.body;
    await WeatherScore.create(weatherScore);
    res.json(weatherScore);
});

router.put("/:tripID/:location", async (req, res) => {
  const { tripID, location } = req.params;
  const updatedWeatherScore = req.body;

  try {
    const existingWeatherScore = await WeatherScore.findOne({
      where: {
        tripID,
        location,
      },
    });

    if (!existingWeatherScore) {
      return res.status(404).json({ error: "Weather score not found" });
    }

    // Update the existing weather score with the new data
    await existingWeatherScore.update(updatedWeatherScore);

    res.json(existingWeatherScore);
  } catch (error) {
    console.error("Error updating weather score:", error);
    res.status(500).json({ error: "Failed to update weather score" });
  }
});


module.exports=router;
