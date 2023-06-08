const express = require('express');
const router = express.Router();
const {TripDayWeather} = require("../models");

router.get("/:tripID", async (req, res) => {
    const { tripID } = req.params;
    const tripDayWeatherResponse = await TripDayWeather.findByPk(tripID);
    
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

module.exports=router;
