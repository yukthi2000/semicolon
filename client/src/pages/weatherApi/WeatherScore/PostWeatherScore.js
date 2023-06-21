import React, { useState, useEffect } from "react";
import axios from "axios";

const PostWeatherScore = (props) => {
    
    const PostData = async () => {
        try {
          const PostData = {
                tripID: props.tripID,
                location: props.location,
                score: props.score,
          };
          console.log(PostData);
      
          // Send the POST request to the backend server
          const response = await axios.post("http://localhost:3001/WeatherScore", PostData);
      
          // Handle the response from the server
          console.log(response.PostData); // Assuming the server sends a success message
        }
        catch (error) {
          console.error('Error creating WeatherScore entry:', error);
          // Handle error response from the server
        }
    }

    useEffect(() => {
        PostData();
      }, [])

      return null;

}

export default PostWeatherScore ;
