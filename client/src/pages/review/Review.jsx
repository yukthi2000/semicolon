import React from "react";
import Header2 from "../../componets/Header2";
<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from './HeaderL';
import DestReviewList from './ReviewList';
import DestReviewStats from './ReviewStats';
import ProductData from './ProductData';
import ReviewForm from './ReviewForm';
=======
>>>>>>> parent of ec66de4 (Merge branch 'dev' into Feature-login)
import "./Review.css";

const Review = () => {
  return (
<<<<<<< HEAD
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
=======
    <div className="review-page">
      <div className="header">
      <Header2/>
      </div>
      <div className="content-review">
        <h1>Start coding...</h1>
      </div>

    </div>
  )
>>>>>>> parent of ec66de4 (Merge branch 'dev' into Feature-login)
}

export default Review;