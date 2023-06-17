import React from "react";
import Header2 from "../../componets/Header2";
import DestReviewList from './ReviewList';
import DestReviewStats from './ReviewStats';
import ProductData from './ProductData';
import ReviewForm from './ReviewForm';
import HeaderL from "./HeaderL";
 

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import "./Review.css";

const Review = () => {
  
  const [review, setReview] = useState(ProductData);
 
  const addReview = newReview => {
    newReview.id = uuidv4();
    setReview([newReview, ...review]);
  };
  
  return (
   <>
   <Header2 />
   <HeaderL />
   <center><h1>Share Your Experience</h1></center>
   <center><h1>Write a review</h1></center>
    <div className="containerr">
    <ReviewForm handleAdd={addReview}/>
   <DestReviewStats review={review} />
  <DestReviewList 
   review={review} 
   
  />
  {/* < TestRadioRating qNo={1}/> */}
      

  </div>
 </>
 );
}


    
export default Review;
