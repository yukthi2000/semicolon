const express = require('express');
const router = express.Router();
const {WeatherOptions} = require("../models");

router.get("/:tripID", async (req, res) => {
    const { tripID } = req.params;
    const weatherResponse = await WeatherOptions.findByPk(tripID);
    
    if (!weatherResponse) {
      return res.status(404).json({ error: "Weather response not found" });
    }
    
    res.json(weatherResponse);
  });
  

router.post("/", async (req,res)=>{
    const weatherOptions = req.body;
    await WeatherOptions.create(weatherOptions);
    res.json(weatherOptions);
});

module.exports=router;
