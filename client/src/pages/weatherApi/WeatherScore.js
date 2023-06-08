import axios from "axios";
import { useEffect,useState } from "react";

function WeatherScore(){

    const [weatherTableData, setWeatherTableData] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3001/WeatherOptions").then((weatherResponse)=>{
        setWeatherTableData(weatherResponse.data);
        console.log(weatherResponse.data);
      });

    }, []);
    
    return(
        <div>
            {weatherTableData.map((value, key) => {
                return (<div>{value.tripID}</div>);
            })}
        </div>
    );
}

export default WeatherScore ;