import React, { useState } from 'react';
import Header2 from "../../componets/Header2";
import WeatherOptions from "../weatherApi/WeatherOptions"
import Forecast from "../weatherApi/Forecast"
import WeatherScore from '../weatherApi/WeatherScore/WeatherScore';
import PostTripDayLocationList from '../weatherApi/WeatherScore/PostTripDayLocationList';
import MapForSuggest from '../suggestLocations/MapForSuggest';
import TouristAttractions from '../suggestLocations/TouristAttractions';
import TestMark from '../suggestLocations/TestMark';
import SLocations from '../suggestLocations/SLocations';


const Gallery = () => {

  const tripDate = new Date('2023-07-01');
  //const locations = ["Kandy","Matale","Moratuwa","Gampaha"]
  const [map, setMap] = useState(null);

  //pull changed location from child components to this cmponent
  const [globalLocation, setGlobalLocation] = useState('Kandy');

  const pull_newGlobalLocation = (newLocation) => {
    setGlobalLocation(newLocation);
  }

  const location = { lat: 7.467465, lng: 80.623416 };
  const locations = [
    { lat: 40.712776, lng: -74.005974 }, // Example location 1
    { lat: 7.2906, lng: 80.6337 }, // Example location 2
    // Add more locations as needed
  ];

  return (
    <div>
      <Header2 />
      <br />
      <br /><br />
      <div className="gallerycontainer">
        <WeatherOptions
        tripID="88888" />
        <Forecast

          currentCity={globalLocation}
          tripDate={tripDate}
          Globalfunc={pull_newGlobalLocation} //passing location function

        />

        <WeatherScore
          tripID="7878"
          location="Matale" />

        {/* <PostTripDayLocationList
          locationList = {locations}
          tripID="7878"
          tripDate={tripDate}
        /> */}

        {/* <MapForSuggest setMap={setMap} />
        {map && <TouristAttractions
          locations={[
            'Kandy, Sri Lanka',
            'Matale, Sri Lanka',
            'Nuwara Eliya, Sri Lanka',
            'Temple of the tooth Relic දළදා මාළිගාව, Temple Square, Kandy, Sri Lanka'
          ]}
          map={map} />} */}
          
          {/* <TestMark
          lat= "7.2906"
          lng= "80.6337"
          /> */}
        {/* <SLocations /> */}

      </div>

    </div>
  );

}

export default Gallery