import React, { useState, useEffect } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TripDayForecast from "./TripDayForecast";
import './SevenDayForecast.css'


function SevenDayForecast(props) {

  const location = props.currentCity;

  const tripDate = new Date(props.tripDate);
  const today = new Date();

  const [errorMassege, seterrorMassege] = useState(null); //error messege variable
  const [arrayExecuted, setArrayExecuted] = useState(false); //variable to see whether array executed

  //function to get gap between two days
  const daysGap = (firstDate, secondDate) => {
    return (
      Math.floor(Math.abs(firstDate - secondDate) / (1000 * 60 * 60 * 24))
    );
  }

  const [SevenDayArray, setSevenDayArray] = useState([])

  //complete array to map function
  for (let i = 1; i <= 7; i++) {

    //break if array executed or array out of bound 
    if ((SevenDayArray.length >= 7) || (arrayExecuted === true)) {
      break;
    }

    const newData = {
      id: i,
      date: tripDate.setDate(tripDate.getDate() + 1),
    }
    console.log(daysGap(today, newData.date));

    if (daysGap(today, newData.date) === 29) {
      //set error message when array ot of bound
      seterrorMassege('Sorry! We can only provide weather data for up to 30 days from today.');
      setArrayExecuted(true);
      break;
    }
    SevenDayArray.push(newData);
  }
  console.log(SevenDayArray);

  return (
    <div>
      <span className="weather-display-ins">The weather forecast for the seven days following the trip day.</span>
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