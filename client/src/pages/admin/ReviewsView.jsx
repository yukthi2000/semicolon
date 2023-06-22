import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Admin.css";
import { AuthContext } from "../../helpers/AuthContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ReviewsView = () => {
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  const { authState } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [checkedReviews, setCheckedReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  // const handleStatusClick = (reviewId) => {
  //   setCheckedReviews((prevCheckedReviews) => {
  //     if (prevCheckedReviews.includes(reviewId)) {
  //       return prevCheckedReviews.filter((id) => id !== reviewId);
  //     } else {
  //       return [...prevCheckedReviews, reviewId];
  //     }
  //   });
  // };

  const handleStatusClick = async (reviewId) => {
    try {
      await axios.patch(
        `http://localhost:3001/reviews/update-status/${reviewId}`,
        { status: !checkedReviews.includes(reviewId) ? 1 : 0  }
      );

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                status: !review.status ? 1 : 0,
              }
            : review
        )
      );
      setFilteredReviews((prevFilteredReviews) =>
        prevFilteredReviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                status: !review.status ? 1 : 0,
              }
            : review
        )
      );

      setCheckedReviews((prevCheckedReviews) =>
        prevCheckedReviews.includes(reviewId)
          ? prevCheckedReviews.filter((id) => id !== reviewId)
          : [...prevCheckedReviews, reviewId]
      );
    } catch (error) {
      console.error("Error updating review status:", error);
      setError("An error occurred while updating the review status");
    }
  };

  const handleFilterClick = () => {
    const filtered = reviews.filter((review) => {
      return review.status === false;
    });
    setFilteredReviews(filtered);
  };

  const handleResetFilterClick = () => {
    setFilteredReviews([]);
  };



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
        await axios.delete(
          `http://localhost:3001/reviews/delete-review/${selectedReview.id}`
        );
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
  
    <div className="start-reviewSec-admin">
   <div className="section-reviews-view">
        <div>
          <button onClick={handleFilterClick}>Filter unChecked</button>
          <button onClick={handleResetFilterClick}>Reset Filter</button>
        </div>
        <br />
        <table style={tableStyle}>
          <thead>
            <tr>
              {/* <th style={thStyle}>Username</th> */}
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Created Date</th>
              <th style={thStyle}>Delete</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {(filteredReviews.length > 0 ? filteredReviews : reviews).map(
              (review) => (
                <tr key={review.id}>
                  <td style={tdStyle}>{review.subject}</td>
                  <td style={tdStyle}>{review.locations}</td>
                  <td style={tdStyle}>{review.createdAt}</td>

                  <td style={tdStyle}>
                    <DeleteForeverIcon
                      onClick={() => handleDeleteClick(review)}
                    />
                  </td>
                  <td style={tdStyle}>
                    {review.status ? (
                      <CheckCircleIcon
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => handleStatusClick(review.id)}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleStatusClick(review.id)}
                      />
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

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
};
export default ReviewsView;
