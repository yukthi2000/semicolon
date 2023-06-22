const express = require('express');
const router = express.Router();
const {TripDayWeather} = require("../models");
const {WeatherScore} = require("../models");

router.get("/:tripID/:location", async (req, res) => {
    //const { tripID } = req.params;
    const { tripID, location } = req.params;
    const tripDayWeatherResponse = await TripDayWeather.findOne({
  where: {
    tripID,
    location,
  },
});

    if (!tripDayWeatherResponse) {
      return res.status(404).json({ error: "Weather response not found" });
    }
    
    res.json(tripDayWeatherResponse);
  });

router.post("/", async (req,res)=>{
    const tripDayWeather = req.body;
    await TripDayWeather.create(tripDayWeather);
    res.json(tripDayWeather);
});

router.get("/:tripID", async (req, res) => {
  const { tripID } = req.params;

  try {
    const tripDayWeatherEntries = await TripDayWeather.findAll({
      where: {
        tripID,
      },
    });

    if (!tripDayWeatherEntries) {
      return res.status(404).json({ error: "Trip day weather entries not found" });
    }

    const combinedEntries = [];

    for (const tripDayWeatherEntry of tripDayWeatherEntries) {
      const { location } = tripDayWeatherEntry;

      const weatherScoreEntry = await WeatherScore.findOne({
        where: {
          tripID,
          location,
        },
      });

      if (!weatherScoreEntry) {
        return res.status(404).json({ error: "Weather score entry not found" });
      }

      const combinedEntry = {
        tripID: tripDayWeatherEntry.tripID,
        location: tripDayWeatherEntry.location,
        lat: tripDayWeatherEntry.lat,
        lng: tripDayWeatherEntry.lng,
        temperature: tripDayWeatherEntry.temperature,
        overall: tripDayWeatherEntry.overall,
        iconID: tripDayWeatherEntry.iconID,
        score: weatherScoreEntry.score,
      };

      combinedEntries.push(combinedEntry);
    }

    res.json(combinedEntries);
  } catch (error) {
    console.error("Error retrieving trip entries:", error);
    res.status(500).json({ error: "Failed to retrieve trip entries" });
  }
});


module.exports=router;
