const express = require('express');
const router = express.Router();
const {tripDayWeather} = require("../models");

router.get("/", async (req, res) =>{
    const tripDayWeatherResponse = await tripDayWeather.findAll();
    res.json(weatherResponses);
});

router.post("/", async (req,res)=>{
    const tripDayWeather = req.body;
    await tripDayWeather.create(tripDayWeather);
    res.json(tripDayWeather);
});

module.exports=router;
