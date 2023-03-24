import React, { useState, useEffect } from "react";
import axios from 'axios';
import WeatherDisplay from "./WeatherDisplay";

const TodayForecast = (props) => {

    const [data, setData] = useState({});
    const [location, setLocation] = useState(props.currentCity);
    const [temperature, setTemperature] = useState(null);
    const [description, setDescription] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [iconID,setIconId] = useState(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=2cdb7a87b467f79781996b8eb03eecda`;

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
            setLocation('');
        }
    }

    useEffect(() => {
        searchLocation({ key: 'Enter' }, props.currentCity);
    }, []);


    //configure today as a date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);

    // Update state variables when weather data is retrieved
    useEffect(() => {
        if (data.main) {
            setTemperature(data.main.temp.toFixed());
            setDescription(data.weather[0].description);
            setFeelsLike(data.main.feels_like.toFixed());
            setWindSpeed(data.wind.speed);
            setHumidity(data.main.humidity);
            setVisibility(data.visibility);
            setIconId(data.weather[0].icon)
        }
    }, [data]);

    return (
        <WeatherDisplay
            temperature={temperature}
            description={description}
            feelsLike={feelsLike}
            windSpeed={windSpeed}
            humidity={humidity}
            visibility={visibility}
            iconID = {iconID}
        />

        // <div className="tripday-forcast">
        //     <input
        //         value={location}
        //         onChange={event => setLocation(event.target.value)}
        //         onKeyPress={searchLocation}
        //         placeholder='Enter Location'
        //         type="text" />
        //     <br />
        //     {data.name !== undefined &&
        //         <div className="content">
        //             {dateString} <br />
        //             City = {data.name} <br />
        //             {temperature && (
        //                 <div>
        //                     Temp = {temperature} °C<br />
        //                     description = {description} <br />
        //                     feels like = {feelsLike} °C<br />
        //                     Wind = {windSpeed} m/s <br />
        //                     Humidity = {humidity}%<br />
        //                     Visibility = {visibility}
        //                 </div>
        //             )}
        //         </div>
        //     }
        // </div>
    );
}

export default TodayForecast;
