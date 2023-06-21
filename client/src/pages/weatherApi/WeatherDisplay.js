import React from "react";
import './WeatherDisplay.css'
import TextField from '@mui/material/TextField';
import weatherIcons from "./WeatherIcon";
import { Box } from "@mui/system";
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import { WiHumidity, WiRaindrops, WiSunrise, WiSunset, WiStrongWind } from "weather-icons-react";
import { useState } from "react";

const WeatherDisplay = (props) => {

    //function to capitalize the first letter
    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

    const [location, setLocation] = useState(); //variable to pass values to parent components


    const pushLocation = (event) => {
        if (event.key === 'Enter') {
            //capitalize the first letter of the location and transfer it
            props.transferData(capitalizeFirst(location));
        }
    }

    return (
      
        <div className="WeatherDisplay-container">

            <div className="main-weather">
                <Box
                    sx={{
                        border: 2,
                        borderRadius: 5,
                        borderWidth: '5px',
                        borderColor: '#C5C5C5'
                    }}>

                    <div className="main-weather-box-inside">

                        <img
                            src={weatherIcons(props.iconID)}
                            alt='weather icon' className="weatherDisplay-icon" />


                        <div className="main-weather-temp">
                            <span className="main-weather-temp-number">
                                {props.temperature}
                            </span>
                            <span className="main-weather-temp-celcius">
                                °C
                            </span>
                        </div>
                        <span className="main-weather-description"> {props.description}</span>



                    </div>

                </Box>
            </div>


            <div className="WeatherDisplay-leftPanel">


                <div className="main-weather-date">
                    <span className="main-weather-date-day"> {props.weekday},</span>
                    <span className="main-weather-date-month"> {props.day} {props.month}</span>
                </div>
                
                {props.showSearch && (
    
                <TextField
                    id="outlined-basic"

                    placeholder="Change Location"
                    variant="outlined"
                    color="warning"
                    className="WeatherDisplay-search"
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={pushLocation}

                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 20,
                            height: 30,
                            width: 280
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderRadius: 20,
                            borderWidth: '3px', // increase the border width
                            height: 36, // set the height of the outline to 36px
                            width: 280
                        },
                        '& .MuiOutlinedInput-input:-webkit-autofill': {
                            height: "0px",
                          },
                    }}


                />
      )}
                <span className="invalid-location">{props.invalidLocation}</span>
                <div className="weather-details-container">


                    <Box sx={{
                        backgroundColor: '#F6F6F8',
                        borderRadius: 2,
                        padding: "5px",
                    }}>
                       
                        <div className="wether-details-row">
                            <Box className="weather-details-card">
                                <span className="weather-details-card-heading">
                                    Feels Like
                                </span>
                                <br />

                                <div className="weather-details-card-content">
                                    <span className="weather-details-card-content-text">
                                        {props.feelsLike}°C
                                    </span>
                                    <DeviceThermostatOutlinedIcon
                                        className="weather-details-icons-feel"
                                    />
                                </div>
                            </Box>

                            <Box className="weather-details-card">
                                <span className="weather-details-card-heading">
                                    Wind
                                </span>
                                <br />

                                <div className="weather-details-card-content">
                                    <span className="weather-details-card-content-text">
                                        {props.windSpeed}
                                        <span className="weather-details-card-content-text-secondary">
                                            m/s
                                        </span>
                                    </span>
                                    <WiStrongWind color='#138EFF' size={30} />
                                </div>
                            </Box>

                        </div>

                        <div className="wether-details-row">
                            <Box className="weather-details-card">
                                <span className="weather-details-card-heading">
                                    Humidity
                                </span>
                                <br />

                                <div className="weather-details-card-content">
                                    <span className="weather-details-card-content-text">
                                        {props.humidity}
                                        <span className="weather-details-card-content-text-secondary">
                                            %
                                        </span>
                                    </span>
                                    <WiHumidity color='#138EFF' size={30} />
                                </div>
                            </Box>

                            <Box className="weather-details-card">
                                <span className="weather-details-card-heading">
                                    Rain
                                </span>
                                <br />

                                <div className="weather-details-card-content">
                                    <span className="weather-details-card-content-text">
                                        {props.rain}
                                        <span className="weather-details-card-content-text-secondary">
                                            mm
                                        </span>
                                    </span>
                                    <WiRaindrops color='#138EFF' size={40} />

                                </div>
                            </Box>

                        </div>

                        <div className="wether-details-row">
                            <Box className="weather-details-card">
                                <span className="weather-details-card-heading">
                                    Sunrise
                                </span>
                                <br />

                                <div className="weather-details-card-content">
                                    <span className="weather-details-card-content-text">
                                        {props.sunrise[0]}
                                        <span className="weather-details-card-content-text-secondary">
                                            {props.sunrise[1]}
                                        </span>
                                    </span>
                                    <WiSunrise color='#F28330' size={30} />
                                </div>
                            </Box>

                            <Box className="weather-details-card">
                                <span className="weather-details-card-heading">
                                    Sunset
                                </span>
                                <br />

                                <div className="weather-details-card-content">
                                    <span className="weather-details-card-content-text">
                                        {props.sunset[0]}
                                        <span className="weather-details-card-content-text-secondary">
                                            {props.sunset[1]}

                                        </span>
                                    </span>
                                    <WiSunset color='#F28330' size={30} />

                                </div>
                            </Box>

                        </div>






                    </Box>

                </div>
            </div>






        </div>
    );
}
export default WeatherDisplay;