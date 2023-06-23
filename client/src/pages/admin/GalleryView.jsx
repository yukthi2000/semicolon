import React, { useState, useEffect, useContext } from "react";

import "./Admin.css";
// import { AuthContext } from "../../../helpers/AuthContext";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function GalleryView() {
  const [images, setImages] = useState([]);
  // const { authState } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checkedImages, setCheckedImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  //try
  const handleStatusClick = async (imageId) => {
    try {
      await axios.patch(
        `http://localhost:3001/images/update-status/${imageId}`,
        { status: !checkedImages.includes(imageId) ? 1 : 0 }
      );

      setImages((prevReviews) =>
        prevReviews.map((image) =>
          image.id === imageId
            ? {
                ...image,
                status: !image.status ? 1 : 0,
              }
            : image
        )
      );
      setFilteredImages((prevFilteredReviews) =>
        prevFilteredReviews.map((image) =>
          image.id === imageId
            ? {
                ...image,
                status: !image.status ? 1 : 0,
              }
            : image
        )
      );

      setCheckedImages((prevCheckedReviews) =>
        prevCheckedReviews.includes(imageId)
          ? prevCheckedReviews.filter((id) => id !== imageId)
          : [...prevCheckedReviews, imageId]
      );
    } catch (error) {
      console.error("Error updating review status:", error);
      setError("An error occurred while updating the review status");
    }
  };

  const handleFilterClick = () => {
    const filtered = images.filter((image) => {
      return image.status === false;
    });
    setFilteredImages(filtered);
  };

  const handleResetFilterClick = () => {
    setFilteredImages([]);
  };
  //try

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
        await axios.delete(
          `http://localhost:3001/images/delete-image/${selectedImage.id}`
        );
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  };

  const cardStyle = {
    width: "100%",
    border: "3px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    backgroundColor: "white",
    height: "28vh",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  };

  return (
    <div style={containerStyle} className="section-gallery-view">
      <div className="filter-btn">
        <button className="filter-button" onClick={handleFilterClick}>
          Filter unChecked
        </button>
        <button className="reset-button" onClick={handleResetFilterClick}>
          Reset Filter
        </button>
      </div>
      <div>
        {(filteredImages.length > 0 ? filteredImages : images).map((image) => (
          <div key={image.id} style={cardStyle}>
            <DeleteForeverIcon
              onClick={() => handleDeleteClick(image)}
              className="del-icon-image-admin"
            />
            <div>
            {image.status ? (
              <CheckCircleIcon
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => handleStatusClick(image.id)}
              />
            ) : (
              <RadioButtonUncheckedIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleStatusClick(image.id)}
              />
            )}
            </div>
            
            <img
              src={`http://localhost:3001/images/${image.fileName}`}
              alt={image.fileName}
              style={imageStyle}
            />
            <p>Location: {image.location}</p>
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
    </div>
  );
}
