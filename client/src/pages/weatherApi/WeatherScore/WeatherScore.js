import axios from "axios";
import { useEffect, useState } from "react";

function WeatherScore(props) {

  const tripID = props.tripID;

  //declare use states to store weather options and 
  const [weatherOptionsData, setWeatherOptionsData] = useState([]);
  const [actualWeatherData, setActualWeatherData] = useState([]);

  //variables for score system
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherOptionsResponse, actualWeatherResponse] = await Promise.all([
          axios.get(`http://localhost:3001/WeatherOptions/${tripID}`),
          axios.get(`http://localhost:3001/TripDayWeather/${tripID}`)
        ]);

        setWeatherOptionsData(weatherOptionsResponse.data);
        setActualWeatherData(actualWeatherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tripID]);;

  useEffect(() => {
    //console.log(weatherOptionsData);
    //console.log(actualWeatherData);
    CalculateFinalScore();

  }, [weatherOptionsData, actualWeatherData]);


  const CalculateOverallScore = () => {
    let score = 0 ;
    if (
      (weatherOptionsData.sunny == true && actualWeatherData.overall == "Clear") ||
      (weatherOptionsData.cloudy == true && actualWeatherData.overall == "Clouds") ||
      (weatherOptionsData.rain == true && actualWeatherData.overall == "Rain") ||
      (weatherOptionsData.thunder == true && actualWeatherData.overall == "Thunderstorm") ||
      (weatherOptionsData.storm == true && actualWeatherData.overall == "Snow")
    ) {
      score = 100 ;
    }
    else {
      score = 0 ;
    }

    return score ;
  };

  const CalculateTempScore = () => {
    let score = 0 ;

    if (
      (weatherOptionsData.exHot == true && actualWeatherData.temperature >= 35) ||
      (weatherOptionsData.hot == true && actualWeatherData.temperature >= 30 && actualWeatherData.temperature < 35) ||
      (weatherOptionsData.averageT == true && actualWeatherData.temperature >= 20 && actualWeatherData.temperature < 30) ||
      (weatherOptionsData.cold == true && actualWeatherData.temperature >= 15 && actualWeatherData.temperature < 20) ||
      (weatherOptionsData.exCold == true && actualWeatherData.temperature < 15)
    ) {
      score = 100 ;
    }
    else if (
      (weatherOptionsData.exHot == true && actualWeatherData.temperature >= 30 && actualWeatherData.temperature < 35) ||
      (weatherOptionsData.hot == true && (actualWeatherData.temperature >= 35) || (actualWeatherData.temperature >= 20 && actualWeatherData.temperature < 30)) ||
      (weatherOptionsData.averageT == true && (actualWeatherData.temperature >= 20 && actualWeatherData.temperature < 30) || (actualWeatherData.temperature >= 15 && actualWeatherData.temperature < 20)) ||
      (weatherOptionsData.cold == true && (actualWeatherData.temperature >= 30 && actualWeatherData.temperature < 35) || (actualWeatherData.temperature < 15)) ||
      (weatherOptionsData.exCold == true && actualWeatherData.temperature >= 15 && actualWeatherData.temperature < 20)
    ) {
      score = 50;
    }
    else {
      score = 0;
    }
    return score ;
  };

  const CalculateWindScore = () => {
    let score = 0;
    if (
      (weatherOptionsData.heavyW == true && actualWeatherData.windSpeed >= 17) ||
      (weatherOptionsData.averageW == true && actualWeatherData.windSpeed < 17 && actualWeatherData.windSpeed >= 8) ||
      (weatherOptionsData.slightW == true && actualWeatherData.windSpeed < 8)
    ) {
      score = 100;
    }
    else {
      score = 0;
    }
    return score ;
  }

  const CalculateFinalScore = () => {
    let fScore = (CalculateOverallScore()+CalculateTempScore()+CalculateWindScore())/3
    setFinalScore(fScore.toFixed(2));
  }
  return (
    <div>
      {finalScore}
    </div>
  );
}

export default WeatherScore;