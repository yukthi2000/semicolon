import React, { useState, useEffect } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TripDayForecast from "./TripDayForecast";


function SevenDayForecast(props) {

  const [newLocationForcast, setNewLocationForcast] = useState('');
  
  const pullLocationForcast = (newFLocation) => {
    setNewLocationForcast(newFLocation) ;
    props.Globalfunc(newFLocation);
  }
    

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        <TripDayForecast 
            currentCity = {props.currentCity}
            tripDate = {props.tripDate}
            pushLocationForcast = {pullLocationForcast} />
            
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}

export default SevenDayForecast;