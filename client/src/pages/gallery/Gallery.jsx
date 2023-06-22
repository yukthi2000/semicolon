import React, { useState,useEffect } from 'react';
import Header2 from "../../componets/Header2";
import WeatherOptions from "../weatherApi/WeatherOptions"
import Forecast from "../weatherApi/Forecast"
import PostTripDayLocationList from '../weatherApi/WeatherScore/PostTripDayLocationList';
import MapForSuggest from '../suggestLocations/MapForSuggest';
import TouristAttractions from '../suggestLocations/TouristAttractions';
import TestMark from '../suggestLocations/TestMark';
import SLocations from '../suggestLocations/SLocations';
import NameToLatLng from '../weatherApi/WeatherScore/NameToLatLng';
import WeatherScoreList from '../weatherApi/WeatherScore/WeatherScoreList';
import WeatherScore from '../weatherApi/WeatherScore/TestScore';
import CalculateWeatherScores from '../weatherApi/WeatherScore/CalculateWeatherScores';
import PostWeatherScore from '../weatherApi/WeatherScore/PostWeatherScore';
import ForecastScore from '../weatherApi/ForcastScore';
// import GetCombinedScore from '../weatherApi/WeatherScore/GetCombinedScore';
// import LatLngToName from '../weatherApi/WeatherScore/LatLngToName';

const Gallery = () => {

  const tripDate = new Date('2023-07-01');
  //const locations = ["Kandy","Matale","Moratuwa","Gampaha"]
  const [map, setMap] = useState(null);

  //pull changed location from child components to this cmponent
  const [globalLocation, setGlobalLocation] = useState('Sri Lanka');

  const pull_newGlobalLocation = (newLocation) => {
    setGlobalLocation(newLocation);
  }

  const location = { lat: 7.467465, lng: 80.623416 };
  const locations = [
    'Nuwara Eliya',
    'Matale'
  ];

  const tripID= "444444"

  // const p = JSON.parse(h);
  //console.log(JSON.parse(h));
  
//   const [h,setH] = useState();
//   const [p,setP] = useState([]); 
// const handleclick=()=>{

//   console.log(h)
//   //setP(JSON.parse(h));
const city = 'Matale';
  return (
    <div>
      <Header2 />
      <br />
      <br /><br />
      <div className="gallerycontainer">
        nsxam k
        {/* <LatLngToName 
        lat= {7.5304285}
        lng= {80.73314859999999}
        /> */}
        
        {/* <PostWeatherScore 
        tripID = "3"
        location = "matale"
        score = {445.2} /> */}

        {/* <CalculateWeatherScores tripID = "2525"
        locationList = {locations}/> */}
        {/* <WeatherOptions
        tripID="252525" />
        <Forecast

          currentCity={globalLocation}
          tripDate={tripDate}
          Globalfunc={pull_newGlobalLocation} //passing location function

        /> */}
        {/* <WeatherOptions tripID={5}/> */}
        <ForecastScore
    currentCity={city}
    tripDate={tripDate}
    Globalfunc={pull_newGlobalLocation} //passing location function
  />

       {/* <WeatherScoreList
        tripID = "252525"
        locationList = {locations}
        /> */}
        {/* <WeatherScore
         tripID = {252525}
         locations = {locations}/> */}

       
        {/* <PostTripDayLocationList
          locationList = {locations}
          tripID="4"
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