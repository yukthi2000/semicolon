import React, { useState, useEffect } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TripDayForecast from "./TripDayForecast";


function SevenDayForecast(props) {

  const location = props.currentCity;

  const [newLocationForcast, setNewLocationForcast] = useState('');
  

  const pullLocationForcast = (newFLocation) => {
    setNewLocationForcast(newFLocation);
  }

  const tripDate = new Date(props.tripDate);
  const today = new Date();
  const [daysGap, setdaysGap] = useState(Math.floor(Math.abs(tripDate - today) / (1000 * 60 * 60 * 24)))

  const [SevenDayArray, setSevenDayArray] = useState([])
  
  for (let i = 1; i <= 7; i++) {

    if (SevenDayArray.length >= 7) {
      break;
    }

    const newData = {
      id: i,
      date: tripDate.setDate(tripDate.getDate() + 1),
    }
        
    SevenDayArray.push(newData);
  }
  console.log(SevenDayArray);

  return (
    <div>
      {SevenDayArray.map((data, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >

            <Typography>{new Date(data.date).toLocaleDateString()}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <TripDayForecast
              currentCity={props.currentCity}
              tripDate={data.date}
              pushLocationForcast={pullLocationForcast} 
            />
          </AccordionDetails>
        </Accordion>
      ))}

    </div>
  );
}

export default SevenDayForecast;