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
    const [iconID, setIconId] = useState(null);
    const [rain, setRain] = useState(null);
    const [sunrise, SetSunrise] = useState(null);
    const [sunset, SetSunset] = useState(null);

    const [invalidLocation, setInvalidLocation] = useState(null);

   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=2cdb7a87b467f79781996b8eb03eecda`;

    //function to exchange location
    const pullLocation  = (newlocation) => {
        setLocation(newlocation);
    }



    // const searchLocation = (event) => {
    //     if (event.key === 'Enter') {
    //         axios.get(url)
    //             .then((response) => {
    //                 setData(response.data);
    //                 console.log(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //         setLocation('');
    //     }
    // }

    // useEffect(() => {
    //     searchLocation({ key: 'Enter' }, props.currentCity);
    // }, []);

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
            setInvalidLocation('*Invalid location or Connection Error');
        });

    }, [location])
    


    //configure today as a date

    const today = new Date();
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
    const month = today.toLocaleDateString('en-US', { month: 'long' });
    const day = today.toLocaleDateString('en-US', { day: 'numeric' });

    //function to convert UNIX Timestamp
    const unixToTime = (unix) => {
        const Udate = new Date(unix * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const options = { hour: 'numeric', minute: 'numeric', hour12: true, hourCycle: 'h12' }; // Set options to get hour and minute in 12-hour format with AM/PM
        const timeString = Udate.toLocaleString('en-US', options)
        return (timeString.slice(0, -2)); //output without AM PM
    }

    // Update state variables when weather data is retrieved
    useEffect(() => {
        if (data.main) {
            setTemperature(data.main.temp.toFixed());
            setDescription(data.weather[0].description);
            setFeelsLike(data.main.feels_like.toFixed());
            setWindSpeed(data.wind.speed);
            setHumidity(data.main.humidity);
            // setVisibility(data.visibility);
            setIconId(data.weather[0].icon);
            SetSunrise(unixToTime(data.sys.sunrise))
            SetSunset(unixToTime(data.sys.sunset))

            if (data.rain && data.rain['1h']) {
                setRain(data.rain['1h']);
            }
            else {
                setRain('N/A ');
            }

            setInvalidLocation(null);
        }
        else {
           
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

            transferData = {pullLocation}
            invalidLocation = {invalidLocation}

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
