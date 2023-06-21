import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../helpers/AuthContext";
import "../UserProfile.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';

const UserReview = () => {
  const { authState } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reviews");
      setReviews(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error retrieving reviews:", error);
      setError("An error occurred while retrieving the reviews");
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedReview(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedReview) {
      try {
        await axios.delete(`http://localhost:3001/reviews/delete-review/${selectedReview.id}`);
        setReviews(reviews.filter((review) => review.id !== selectedReview.id));
        setOpenDialog(false);
        setSelectedReview(null);
      } catch (error) {
        console.error("Error deleting review:", error);
        setError("An error occurred while deleting the review");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {reviews
          .filter((review) => review.userId == authState.id)
          .map((review) => (
            <div className="reviewCard" key={review.id}>
              <div>
                <div className="delete-icon">
                  <DeleteForeverIcon onClick={() => handleDeleteClick(review)} />
                </div>
                <h5>{authState.name} wrote a review...</h5>
                <div>Subject: {review.subject}</div>
                <div>Locations: {review.locations}</div>
                <div>Created At: {review.createdAt}</div>
              </div>
            </div>
          ))}
      </ul>

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
};

export default UserReview;
