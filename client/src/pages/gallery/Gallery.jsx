import React from "react";
import Header2 from "../../componets/Header2";
import Forecast from "../weatherApi/Forecast";
import WeatherOptions from "../weatherApi/WeatherOptions";


const Gallery=()=>{

  const tripDate = new Date('2023-03-30');

  return(
    <div>
      <Header2/>
      <br />
      <br /><br />
      <div className="gallerycontainer">
      <WeatherOptions/>
      <Forecast 
        currentCity='Kandy'
        tripDate = {tripDate}/>
      </div>
  
    </div>
  )
}

export default Gallery;