import React, { useState, useEffect } from "react";
import axios from 'axios';

function SevenDayForecast(props) {

  const tripDate = new Date(props.tripDate);

  const [count,setCount] = useState ('0');


  const [data, setData] = useState({});
  const [location, setLocation] = useState(props.currentCity);

  const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${location}&units=metric&appid=2cdb7a87b467f79781996b8eb03eecda`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });


    }
  }

  useEffect(() => {
    searchLocation({ key: 'Enter' }, props.currentCity);
  }, []);


  //configure today as a date
  const today = new Date();

  //calculate trip Day index for API
  const dateIndex = Math.floor(Math.abs(tripDate - today) / (1000 * 60 * 60 * 24));

  //configure proper Tripdate format
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const TripDateString = tripDate.toLocaleDateString('en-US', options);


  return (
    <div>
      
      <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
      <br />
      {TripDateString}

      {data.code !== undefined &&
        <div className="content">

          City = {data.city && data.city.name} <br />
          Temp = {data.list[dateIndex].temp && data.list[dateIndex].temp.day.toFixed()} °C<br />
          description = {data.list[dateIndex] && data.list[dateIndex].weather[0] && data.list[dateIndex].weather[0].description} <br />
          feels like = {data.list[dateIndex] && data.list[dateIndex].feels_like && data.list[dateIndex].feels_like.day.toFixed()} °C<br />
          Wind = {data.list[dateIndex] && data.list[dateIndex].speed} m/s <br />
          Humidity = {data.list[dateIndex] && data.list[dateIndex].humidity}%<br />
          date = {data.list[dateIndex].dt}

        </div>

      }

    </div>
  )
}

export default SevenDayForecast;