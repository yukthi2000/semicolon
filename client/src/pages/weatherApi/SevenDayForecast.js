import React, { useState} from "react";

//importing material UI components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TripDayForecast from "./TripDayForecast";
import './SevenDayForecast.css'


function SevenDayForecast(props) {

  // getting current city and trip date from props
  const location = props.currentCity;
  const tripDate = new Date(props.tripDate);
  
  //get today as a date
  const today = new Date();


  const [errorMassege, seterrorMassege] = useState(null); //error messege variable
  const [arrayExecuted, setArrayExecuted] = useState(false); //variable to see whether array executed

  //function to get gap between two days
  const daysGap = (firstDate, secondDate) => {
    return (
      Math.floor(Math.abs(firstDate - secondDate) / (1000 * 60 * 60 * 24))
    );
  }

   //state variable to hold the seven day forecast array
  const [SevenDayArray, setSevenDayArray] = useState([])

  //complete array to map function
  for (let i = 1; i <= 7; i++) {

    //break if array already executed or array out of bound 
    if ((SevenDayArray.length >= 7) || (arrayExecuted === true)) {
      break;
    }

    //creating new data object for each day
    const newData = {
      id: i,
      date: tripDate.setDate(tripDate.getDate() + 1),
    }

    if (daysGap(today, newData.date) === 29) {
      
      //set error message when array ot of bound
      seterrorMassege('Sorry! We can only provide weather data for up to 30 days from today.');
      setArrayExecuted(true);
      break;
    }
    //adding new data to the seven day forecast array
    SevenDayArray.push(newData);
  }
  console.log(SevenDayArray);

  return (
    <div>
      <span className="weather-display-ins">The weather forecast for the seven days following the trip day.</span><br/>
      <span className="sevenday-error"> {errorMassege} </span>
      {SevenDayArray.map((data, index) => (
        <Accordion key={index} 
        sx={{ 
          borderRadius:'15px',
          margin : '5px',
          boxShadow:'none',
          
        '& .MuiButtonBase-root' :{
          backgroundColor:'#ffdbc19e',
          borderRadius:'15px'
        },
        '&::before': { display: 'none' }
        }}>
          
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >

            <span className="acco-heading">
              {new Date(data.date).toLocaleDateString()}
            </span>
          
          </AccordionSummary>
         
          <AccordionDetails>
            <TripDayForecast
              currentCity={props.currentCity}
              tripDate={data.date}        
            />

          </AccordionDetails>
        </Accordion>
      ))}

    </div>
  );
}

export default SevenDayForecast;