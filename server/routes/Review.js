const express = require('express');
const router = express.Router();
const db = require('../models'); // Assuming your Sequelize models are in a 'models' directory
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);


// GET method for retrieving all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await db.Review.findAll(); // Retrieve all reviews from the database
    res.json(reviews); // Return the reviews as JSON response
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the reviews' });
  }
});


module.exports = router;
