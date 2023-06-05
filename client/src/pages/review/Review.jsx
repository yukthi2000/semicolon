import React from "react";
import Header2 from "../../componets/Header2";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Map from "../newSearch/Map";

const Review = () => {
  return (
    <div className="review-page">
      <div className="header">
        <Header2 />
      </div>
      <div className="content-review">
        <h1 style={{paddingTop:100}}>Start coding...</h1>

        
        <Map /> 
      </div>
    </div>
  );
};
export default Review;
