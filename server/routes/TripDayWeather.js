const express = require('express');
const router = express.Router();
const {TripDayWeather} = require("../models");

router.get("/", async (req, res) =>{
    const tripDayWeatherResponse = await TripDayWeather.findAll();
    res.json(tripDayWeatherResponse);
});

router.post("/", async (req,res)=>{
    const tripDayWeather = req.body;
    await TripDayWeather.create(tripDayWeather);
    res.json(tripDayWeather);
});

module.exports=router;
