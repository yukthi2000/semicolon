import React from "react";
import Header2 from "../../componets/Header2";
import ReviewList from './ReviewList';
import ReviewStats from './ReviewStats';
import ProductData from './ProductData';
import ReviewForm from './ReviewForm';
import HeaderL from "./HeaderL";
import { useLocation } from 'react-router-dom';
 

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import "./review.css";




const Review = () => {
  
  const [review, setReview] = useState(ProductData);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const placeIdRec = searchParams.get('placeIdURL');

  
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
   <HeaderL />
    <div className="container">
    <ReviewForm handleAdd={addReview} placeId={placeIdRec} userId="vdedd14"/>
   <ReviewStats review={review} placeId={placeIdRec}/>
  <ReviewList 
   review={review} 
   handleDelete={deleteFeedback} 
   placeId={placeIdRec}
  />
  {/* < TestRadioRating qNo={1}/> */}
      

  </div>
 </>
 );
}


    
export default Review;