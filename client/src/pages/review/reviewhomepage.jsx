import React from 'react';
import './color.css';
import DestReviewList from './ReviewList';
import DestReviewStats from './ReviewStats';
import ProductData from './ProductData';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


import { Link } from 'react-router-dom';

function Color() {
  const [review, setReview] = useState(ProductData);
 
  const addReview = newReview => {
    newReview.id = uuidv4();
    setReview([newReview, ...review]);
  };
  const deleteFeedback = id => {
   if (window.confirm('Are you sure you want to delete?')) {
    setReview(review.filter(item => item.id !== id));
    }
 };

  return (
    <div className="containerr">
      <div className="top-section">
      <center><h1>Give a tip</h1></center>
   <center><h1>Make a wonderful trip for another</h1></center>
      </div>
      <div className="middle-section">
        <Link to="/review "><button>hud</button></Link>
      </div>
      <div className="bottom-section">
      <h3>your reviews</h3>
      <div className="container">
      
   <DestReviewStats review={review} />
  <DestReviewList 
   review={review} 
   handleDelete={deleteFeedback} 
  />
  {/* < TestRadioRating qNo={1}/> */}
      

  </div>
      </div>
    </div>
  );
}

export default Color;