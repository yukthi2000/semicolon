import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetCombinedScore({ tripID,onStringChange}) {
//   const [tripEntries, setTripEntries] = useState([]);
//   const [tripEntriesString, setTripEntriesString] = useState("");

  useEffect(() => {
    async function fetchTripEntries() {
      try {
        const response = await axios.get(`http://localhost:3001/TripDayWeather/${tripID}`);
        const combinedEntries = response.data;
        // setTripEntries(combinedEntries);
        // setTripEntriesString(JSON.stringify(combinedEntries))
        onStringChange(JSON.stringify(combinedEntries));
      } catch (error) {
        console.error("Error retrieving trip entries:", error);
        // setTripEntries([]);
        
      }
    }
    fetchTripEntries();
  }, [tripID]);
  
}

export default GetCombinedScore;
