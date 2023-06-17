import React, { useState, useEffect } from "react";
import axios from "axios";

// functional component TripDayForecast
const PostTripDayWeather = (props) => {

  
    const handleSubmit = async () => {
        try {
          const PostData = {
                cloudy: false,
                sunny: false,
                rain: false,
                thunder: false,
                exHot: false,
                storm: false,
                hot: false,
                averageT: false,
                cold: false,
                exCold: false,
                heavy: false,
                averageW: false,
                slight: false,
          };
          console.log(PostData);
      
          // Send the POST request to the backend server
          const response = await axios.post("http://localhost:3001/TripDayWeather", PostData);
      
          // Handle the response from the server
          console.log(response.PostData); // Assuming the server sends a success message
        }
        catch (error) {
          console.error('Error creating TripDayWeather entry:', error);
          // Handle error response from the server
        }
    }

    return (
    <div>
        <button onClick={handleSubmit}>Post Weather data</button> 
    </div>
    );
}

export default PostTripDayWeather ;
