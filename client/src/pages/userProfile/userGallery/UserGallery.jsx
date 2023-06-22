import React, { useState, useEffect, useContext } from "react";
import "../UserProfile.css";
import { AuthContext } from "../../../helpers/AuthContext";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';


export default function UserGallery() {
  // const [images, setImages] = useState([]);

  // const fetchImages = async () => {
  //   try {
  //     const response = await fetch('"http://localhost:3001/api/images/upload');
  //     const data = await response.json();

  //     if (data.success) {
  //       setImages(data.images);
  //     } else {
  //       console.error('Failed to fetch images:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching images:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchImages();
  // }, []);
  const [images, setImages] = useState([]);
  const { authState } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDeleteClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedImage) {
      try {
        await axios.delete(`http://localhost:3001/images/delete-image/${selectedImage.id}`);
        setImages(images.filter((image) => image.id !== selectedImage.id));
        setOpenDialog(false);
        setSelectedImage(null);
      } catch (error) {
        console.error("Error deleting review:", error);
        setError("An error occurred while deleting the review");
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/images")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px'
  };

  const cardStyle = {
    width: '100%',
    border: '3px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    backgroundColor: "white"
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px'
  };


  return (
    <div style={containerStyle}>
      {images.map((image) => (
        <div key={image.id} style={cardStyle}>
        <DeleteForeverIcon onClick={() => handleDeleteClick(image)} />
          <img
            src={`http://localhost:3001/images/${image.fileName}`}
            alt={image.fileName}
            style={imageStyle}
          />
          <p>Location: {image.location}</p>
          <p>User ID: {image.userId}</p>
        </div>
      ))}
      
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
