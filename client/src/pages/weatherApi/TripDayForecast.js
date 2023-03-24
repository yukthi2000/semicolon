import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";

const TripDayForecast = (props) => {

    const tripDate = new Date(props.tripDate);

    const [data, setData] = useState({});
    const [location, setLocation] = useState(props.currentCity);
    const [temperature, setTemperature] = useState(null);
    const [description, setDescription] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [iconID, setIconId] = useState(null);
    const [rain, setRain] = useState(null);
    const [sunrise, SetSunrise] = useState(null);
    const [sunset, SetSunset] = useState(null);

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

    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const weekday = tripDate.toLocaleDateString('en-US', { weekday: 'long' });
    const month = tripDate.toLocaleDateString('en-US', { month: 'long' });
    const day = tripDate.toLocaleDateString('en-US', { day: 'numeric' });

    //function to convert UNIX Timestamp
    const unixToTime = (unix) => {
        const Udate = new Date(unix * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const options = { hour: 'numeric', minute: 'numeric', hour12: true, hourCycle: 'h12' }; // Set options to get hour and minute in 12-hour format with AM/PM
        const timeString = Udate.toLocaleString('en-US', options)
        return (timeString.slice(0, -2)); //output without AM PM
    }
    // Update state variables when weather data is retrieved
    useEffect(() => {
        if (data.code) {
            setTemperature(data.list[dateIndex].temp && data.list[dateIndex].temp.day.toFixed());
            setDescription(data.list[dateIndex] && data.list[dateIndex].weather[0] && data.list[dateIndex].weather[0].description);
            setFeelsLike(data.list[dateIndex] && data.list[dateIndex].feels_like && data.list[dateIndex].feels_like.day.toFixed());
            setWindSpeed(data.list[dateIndex] && data.list[dateIndex].speed);
            setHumidity(data.list[dateIndex] && data.list[dateIndex].humidity);
            setRain(data.list[dateIndex] && data.list[dateIndex].rain)
            setIconId(data.list[dateIndex] && data.list[dateIndex].weather[0] && data.list[dateIndex].weather[0].icon);
            SetSunrise(unixToTime(data.list[dateIndex] && data.list[dateIndex].sunrise))
            SetSunset(unixToTime(data.list[dateIndex] && data.list[dateIndex].sunset))

        }
    }, [data]);



    return (
              <WeatherDisplay
              temperature={temperature}
                description={description}
                feelsLike={feelsLike}
                windSpeed={windSpeed}
                humidity={humidity}
                iconID={iconID}
                weekday={weekday}
                month={month}
                day={day}
                rain={rain}
                sunrise={sunrise}
                sunset={sunset}
            />

            //  <input
            //     value={location}
            //     onChange={event => setLocation(event.target.value)}
            //     onKeyPress={searchLocation}
            //     placeholder='Enter Location'
            //     type="text" />
            // <br />
            // {TripDateString}

            // {data.code !== undefined &&
            //     <div className="content">

            //         City = {data.city && data.city.name} <br />
            //         Temp = {data.list[dateIndex].temp && data.list[dateIndex].temp.day.toFixed()} °C<br />
            //         description = {data.list[dateIndex] && data.list[dateIndex].weather[0] && data.list[dateIndex].weather[0].description} <br />
            //         feels like = {data.list[dateIndex] && data.list[dateIndex].feels_like && data.list[dateIndex].feels_like.day.toFixed()} °C<br />
            //         Wind = {data.list[dateIndex] && data.list[dateIndex].speed} m/s <br />
            //         Humidity = {data.list[dateIndex] && data.list[dateIndex].humidity}%<br />
            //         date = {data.list[dateIndex].dt}
            //         <br />
            // } 


            
    );
}

export default TripDayForecast;
