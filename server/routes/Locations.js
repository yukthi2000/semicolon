const express = require("express");
const router = express.Router();
const { Locations } = require("../models");

router.post("/", async (req, res) => {
  const data = req.body;
  await Locations.bulkCreate(data)
    .then(() => res.json(data))
    .catch((err) => res.status(500).send(err));
  
});

router.get("/a", (req, res) => {
  res.json("hello world");
});

module.exports = router;
