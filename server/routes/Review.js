const express = require('express');
const router = express.Router();
const {Review} = require('../models'); // Assuming your Sequelize models are in a 'models' directory
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);


// GET method for retrieving all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll(); // Retrieve all reviews from the database
    res.json(reviews); // Return the reviews as JSON response
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the reviews' });
  }
});

// DELETE method for deleting a review by ID
router.delete('/delete-review/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.destroy({ where: { id: reviewId } });
    if (deletedReview) {
      res.sendStatus(204); // Return a successful response with status code 204 (No Content)
    } else {
      res.sendStatus(404); // Return a not found response with status code 404 (Not Found)
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'An error occurred while deleting the review' });
  }
});

 //no of reviews display in Admin module
 router.get("/reviews-count", async (req, res) => {
  try {
    const count = await Review.count();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while counting users" });
  }
});


//update status column in review table
router.patch("/update-status/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.status = !review.status; // Toggle the status value
    await review.save();

    res.status(200).json({ message: "Review status updated successfully" });
  } catch (error) {
    console.error("Error updating review status:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the review status" });
  }
});

module.exports = router;