import React, { useState } from 'react';
import Header2 from "../../componets/Header2";
import WeatherOptions from "../weatherApi/WeatherOptions"
import Forecast from "../weatherApi/Forecast"
import WeatherScore from '../weatherApi/WeatherScore/WeatherScore';
import PostTripDayWeather from '../weatherApi/WeatherScore/PostTripDayWeather';


const Gallery = () => {

  const tripDate = new Date('2023-07-01');

  //pull changed location from child components to this cmponent
  const [globalLocation, setGlobalLocation] = useState('Kandy');

  const pull_newGlobalLocation = (newLocation) => {
    setGlobalLocation(newLocation);
  }

  return (
    <div>
      <Header2 />
      <br />
      <br /><br />
      <div className="gallerycontainer">
        <WeatherOptions />
        <Forecast

          currentCity={globalLocation}
          tripDate={tripDate}
          Globalfunc={pull_newGlobalLocation} //passing location function

        />

        <WeatherScore />
        <PostTripDayWeather
          currentCity={globalLocation}
          tripID="1234"
          tripDate={tripDate}
        />

      </div>

    </div>
  );

}

export default Gallery