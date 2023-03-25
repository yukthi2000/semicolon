import React from "react";
import Header2 from "../../componets/Header2";
import Forecast from "../weatherApi/Forecast";
import WeatherOptions from "../weatherApi/WeatherOptions";
import { useState } from "react";


const Gallery=()=>{

  const tripDate = new Date('2023-03-30');

  //pass changed location from child components to this cmponent
  const [globalLocation, setGlobalLocation] = useState('Kandy');

  const pull_newGlobalLocation = (newLocation) => {
    setGlobalLocation(newLocation);
  }

  return(
    <div>
      <Header2/>
      <br />
      <br /><br />
      <div className="gallerycontainer">
      <WeatherOptions/>
      <Forecast 
        
        currentCity={globalLocation}
        tripDate = {tripDate}
        Globalfunc={pull_newGlobalLocation} //passing location function
        
        />

      </div>
  
    </div>
  );
}

export default Gallery;
