import React from "react";
import Header2 from "../../componets/Header2";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

const Review = () => {
  return (
    <div>
      <Header2 />

=======

const Review = () => {
  return (
    <div>
      <Header2 />

>>>>>>> parent of 9b6f585 (rating form added)
=======

const Review = () => {
  return (
    <div>
      <Header2 />

>>>>>>> parent of 9b6f585 (rating form added)

      xsszxCadsdfdsfds Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis dolorem totam error, eligendi adipisci provident a mollitia dolor qui quas. Pariatur, a eveniet eius iure sit atque libero amet laboriosam quo odio quis odit minima ipsam autem velit aperiam porro eos eaque similique inventore reiciendis deleniti architecto. Voluptatibus dolorem ab aperiam incidunt quos atque explicabo voluptates quaerat! Repellendus sapiente, mollitia, perspiciatis odit placeat totam ducimus provident fugiat, debitis commodi voluptate?




    </div>
  )
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 9b6f585 (rating form added)
=======
>>>>>>> parent of 9b6f585 (rating form added)
=======
>>>>>>> parent of 9b6f585 (rating form added)
}

export default Review;