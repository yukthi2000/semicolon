// controllers/imageController.js
const Image = require('../models/Image');

// Function to handle image upload
async function uploadImage(req, res) {
  const { location, userId } = req.body;

  try {
    // Create a new image record in the database
    const newImage = await Image.create({ location, userId });

    res.status(201).json({ success: true, image: newImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
}

module.exports = { uploadImage };
