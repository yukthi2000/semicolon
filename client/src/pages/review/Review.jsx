import React from "react";
import Header2 from "../../componets/Header2";

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from './HeaderL';
import DestReviewList from './ReviewList';
import DestReviewStats from './ReviewStats';
import ProductData from './ProductData';
import ReviewForm from './ReviewForm';

import "./Review.css";

const Review = () => {
  
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

   <>
   <Header2 />
   <Header />
   <center><h1>Share Your Experience</h1></center>
   <center><h1>Write a review</h1></center>
    <div className="container">
    <ReviewForm handleAdd={addReview}/>
   <DestReviewStats review={review} />
  <DestReviewList 
   review={review} 
   handleDelete={deleteFeedback} 
  />
  {/* < TestRadioRating qNo={1}/> */}
      

  </div>
 </>
 );
}


export default Review;