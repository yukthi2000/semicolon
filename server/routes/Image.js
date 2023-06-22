const express = require('express');
const multer = require('multer');
const {Image} = require('../models');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: './public/images', // Create this directory for storing images
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint for image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.file);
  try {
    const { userId, location } = req.body;
    const { filename, mimetype } = req.file;

    const image = await Image.create({
      userId:userId,
      location:location,
      fileName: filename,
      fileType: mimetype,
    });

    res.json( image );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error here' });
  }
});

router.get('/', async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

// DELETE method for deleting a image by ID
router.delete('/delete-image/:id', async (req, res) => {
  try {
    const imageId = req.params.id;
    const deletedImage = await Image.destroy({ where: { id: imageId } });
    if (deletedImage) {
      res.sendStatus(204); // Return a successful response with status code 204 (No Content)
    } else {
      res.sendStatus(404); // Return a not found response with status code 404 (Not Found)
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'An error occurred while deleting the review' });
  }
});
