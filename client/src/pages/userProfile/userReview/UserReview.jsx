import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../helpers/AuthContext";
const UserReview = () => {
 
  const { authState } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchReviews();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
    <h2>Reviews</h2>
    <h1>{authState.name}</h1>
    <ul>
      {reviews
        .filter((review) => review.userId == authState.id)
        .map((review) => (
          <li key={review.id}>{review.locations}</li>
        ))}
    </ul>
  </div>
);
};


export default UserReview;