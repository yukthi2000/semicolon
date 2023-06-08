import React, { useState, useEffect } from "react";
import axios from "axios";

// functional component TripDayForecast
const PostTripDayWeather = (props) => {

    // initialize state variables for weather data
    const [data, setData] = useState({});
    //const [location, setLocation] = useState(props.currentCity);
    const location = props.currentCity;
    const tripID = props.tripID;
    const [temperature, setTemperature] = useState(null);
    const [overall, setOverall] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [iconID, setIconId] = useState(null);

    // convert props.tripDate to Date format
    const tripDate = new Date(props.tripDate);

    //configure today as a date
    const today = new Date();

    //calculate trip Day index for API
    const dateIndex = Math.floor(Math.abs(tripDate - today) / (1000 * 60 * 60 * 24));

    // configure url for API call
    const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${location}&units=metric&appid=2cdb7a87b467f79781996b8eb03eecda`;

    // useEffect hook to make API call when location changes
    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    // Update state variables when weather data is retrieved
    useEffect(() => {
        if (data.code) {
            //assign tripday data to state variables 
            setTemperature(data.list[dateIndex].temp && data.list[dateIndex].temp.day.toFixed());
            setOverall(data.list[dateIndex] && data.list[dateIndex].weather[0] && data.list[dateIndex].weather[0].main);
            setWindSpeed(data.list[dateIndex] && data.list[dateIndex].speed);
            setIconId(data.list[dateIndex] && data.list[dateIndex].weather[0] && data.list[dateIndex].weather[0].icon);
        }
    }, [data]);

    // Call handleSubmit function when state variables update
    useEffect(() => {
        if (temperature !== null && overall !== null && windSpeed !== null && iconID !== null) {
            handleSubmit();
        }
    }, [temperature, overall, windSpeed, iconID]);


    const handleSubmit = async () => {
        try {
            const PostData = {
                tripID: tripID,
                location: location,
                temperature: temperature,
                windSpeed: windSpeed,
                overall: overall,
                iconID: iconID
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
        </div>
    );
}

export default PostTripDayWeather;
