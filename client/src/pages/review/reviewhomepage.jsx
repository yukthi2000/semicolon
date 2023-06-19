import React from 'react';
import './color.css';
import DestReviewList from './ReviewList';
import DestReviewStats from './ReviewStats';
import ProductData from './ProductData';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import homeBg from "../../assets/homeBG.jpg"
import Search from './Search';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Color() {
  const [review, setReview] = useState(ProductData); // displaying hardcored data 
  const navigate = useNavigate();
  // yuki
  const [startlocation, setstartLocation] = React.useState([]);
  //


  const addReview = newReview => {
    newReview.id = uuidv4();
    setReview([newReview, ...review]);
  };
  const deleteFeedback = id => {                             // deleting a review
   if (window.confirm('Are you sure you want to delete?')) {
    setReview(review.filter(item => item.id !== id));
    }
 };

 //yuki
 const setLocationstart = (data) => {
  setstartLocation(data);
  // setIsLocationEntered(true);
};
 //

 // From Previous search Box
 const handleSubmit = (event) => {
  event.preventDefault();
  alert(`The place you entered was: ${startlocation}`)

  fetch(`http://localhost:9000/api/ratingsPlaceId`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      "placeName": `${startlocation}` 
  })

  })
   .then((response) => response.json())
   .then((json) => {
      // Handle data
      //console.log(json);
      // sessionStorage.setItem('placeIdRec', json.placeId);
      
      navigate('/review?placeIdURL='+json.placeId);
      
   })
  .catch((err) => {
      console.log(err.message);
      return 404;
   });
 
};
 //

  return (
    <div className="containerR">
      <div className="top-section">
      <center><h1>Give a tip</h1></center>
   <center><h1>Make a wonderful trip for another</h1></center>
      </div>
      <form id="searchBar" onSubmit={handleSubmit}>
      <center><Search currlocation2={setLocationstart}/><br/>
      <button type='submit' class="btn btn-info searchBtn">Review</button>
      </center>
      </form>
      {/* <div className="searchBar">
        <div class="searchInputBoxCont"><input class="searchInputBox" placeholder="     Write the location....."/></div>
        <div><Link to="/review"><button class="btn btn-info searchBtn">Review</button></Link></div>
        
      </div> */}
      <div className="bottom-section">
      {/* <h3>Your Previous Reviews</h3>
      <div className="containerR"> */}
    {/* <div class="ReviewStatComp">  
     <DestReviewStats review={review}/>
   </div> */}
   {/* <div class="pastReviews">
      <DestReviewList 
      review={review} 
      handleDelete={deleteFeedback} 
      />
  </div> */}
  {/* < TestRadioRating qNo={1}/> */}
      

  {/* </div> */}
      </div>
    </div>
  );
}

export default Color;