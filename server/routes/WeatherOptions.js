const express = require('express');
const router = express.Router();
const {WeatherOptions} = require("../models");

router.get("/", async (req, res) =>{
    const weatherResponses = await WeatherOptions.findAll();
    res.json(weatherResponses);
});

router.post("/", async (req,res)=>{
    const weatherOptions = req.body;
    await WeatherOptions.create(weatherOptions);
    res.json(weatherOptions);
});

module.exports=router;
