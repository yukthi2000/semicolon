import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CalculateWeatherScores(props) {
  const { locationList, tripID } = props;

  const weatherScoreMap = locationList.map((item, index) => (
    <WeatherScore
      key={index}
      location={item} // Pass the entire item object as the location prop
      tripID={tripID}
    />
  ));

  console.log(weatherScoreMap);

  return <div>{weatherScoreMap}</div>;


}

function WeatherScore(props) {
  const tripID = props.tripID;
  const location = props.location;

  // declare use states to store weather options and actual weather data
  const [weatherOptionsData, setWeatherOptionsData] = useState([]);
  const [actualWeatherData, setActualWeatherData] = useState([]);

  // variables for score system
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherOptionsResponse, actualWeatherResponse] = await Promise.all([
          axios.get(`http://localhost:3001/WeatherOptions/${tripID}`),
          axios.get(`http://localhost:3001/TripDayWeather/${tripID}/${location}`)
        ]);
        console.log(actualWeatherResponse.data);
        console.log("Location prop:", location);
        setWeatherOptionsData(weatherOptionsResponse.data);
        setActualWeatherData(actualWeatherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tripID, location]);

  const CalculateOverallScore = () => {
    let score = null;
    if (
      (weatherOptionsData.sunny === true && actualWeatherData.overall === "Clear") ||
      (weatherOptionsData.cloudy === true && actualWeatherData.overall === "Clouds") ||
      (weatherOptionsData.rain === true && actualWeatherData.overall === "Rain") ||
      (weatherOptionsData.thunder === true && actualWeatherData.overall === "Thunderstorm") ||
      (weatherOptionsData.storm === true && actualWeatherData.overall === "Snow")
    ) {
      score = 100;
    } else {
      score = 0;
    }
    return score;
  };

  const CalculateTempScore = () => {
    let score = null;

    if (
      (weatherOptionsData.exHot === true && actualWeatherData.temperature >= 35) ||
      (weatherOptionsData.hot === true && actualWeatherData.temperature >= 30 && actualWeatherData.temperature < 35) ||
      (weatherOptionsData.averageT === true && actualWeatherData.temperature >= 20 && actualWeatherData.temperature < 30) ||
      (weatherOptionsData.cold === true && actualWeatherData.temperature >= 15 && actualWeatherData.temperature < 20) ||
      (weatherOptionsData.exCold === true && actualWeatherData.temperature < 15)
    ) {
      score = 100;
    } else if (
      (weatherOptionsData.exHot === true && actualWeatherData.temperature >= 30 && actualWeatherData.temperature < 35) ||
      (weatherOptionsData.hot === true && (actualWeatherData.temperature >= 35) || (actualWeatherData.temperature >= 20 && actualWeatherData.temperature < 30)) ||
      (weatherOptionsData.averageT === true && (actualWeatherData.temperature >= 20 && actualWeatherData.temperature < 30) || (actualWeatherData.temperature >= 15 && actualWeatherData.temperature < 20)) ||
      (weatherOptionsData.cold === true && (actualWeatherData.temperature >= 30 && actualWeatherData.temperature < 35) || (actualWeatherData.temperature < 15)) ||
      (weatherOptionsData.exCold === true && actualWeatherData.temperature >= 15 && actualWeatherData.temperature < 20)
    ) {
      score = 50;
    } else {
      score = 0;
    }
    return score;
  };

  const CalculateWindScore = () => {
    let score = null;
    if (
      (weatherOptionsData.heavyW === true && actualWeatherData.windSpeed >= 17) ||
      (weatherOptionsData.averageW === true && actualWeatherData.windSpeed < 17 && actualWeatherData.windSpeed >= 8) ||
      (weatherOptionsData.slightW === true && actualWeatherData.windSpeed < 8)
    ) {
      score = 100;
    } else {
      score = 0;
    }
    return score;
  };
 
 const [isScorePosted, setIsScorePosted] = useState(false);


 useEffect(() => {
  const overallScore = CalculateOverallScore();
  const tempScore = CalculateTempScore();
  const windScore = CalculateWindScore();

  const fScore = (overallScore + tempScore + windScore) / 3;
  setFinalScore(fScore.toFixed(2));

  if (finalScore && !isScorePosted) {
    PostData(tripID, location, finalScore);
    setIsScorePosted(true);
  } else if (finalScore && isScorePosted) {
    UpdateData(tripID, location, finalScore);
  }
}, [weatherOptionsData, actualWeatherData]);


  // useEffect(() => {
  //   if (finalScore && !isScorePosted) {
  //     PostData(tripID, location, finalScore);
  //     setIsScorePosted(true);
  //   } else {
  //     UpdateData(tripID, location, finalScore);
  //   }
  // }, [finalScore, isScorePosted]);
  


  const UpdateData = async (tripID, location, score) => {
    try {
      const postData = {
        tripID: tripID,
        location: location,
        score: score,
      };
      await axios.put(`http://localhost:3001/WeatherScore/${tripID}/${location}`, postData);
      console.log('WeatherScore entry updated successfully.');
    }
    catch (error) {
      console.error('Error creating/updating WeatherScore entry:', error);
    }
  }

  // useEffect(() => {
  //   if (ScorePosted) {
  //     UpdateData(tripID, location, finalScore);
  //   }
  // }, [ScorePosted])

  const PostData = async (tripID, location, score) => {
    try {
      const postData = {
        tripID: tripID,
        location: location,
        score: score,
      };
      await axios.post("http://localhost:3001/WeatherScore", postData);
      console.log("WeatherScore entry created successfully.");
      setIsScorePosted(true);
    } catch (error) {
      console.error("Error creating/updating WeatherScore entry:", error);
      // Handle error response from the server
    }
  };
  

  return (
    <>
      {/* <p>{location}</p>
      <p>{finalScore}</p> */}
    </>
  );
}
