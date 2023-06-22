
// import required modules
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Dialog, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import './Forecast.css'
import TripDayForecast from './TripDayForecast';
import TodayForecast from './TodayForecast';
import SevenDayForecast from './SevenDayForecast';
import { useState } from 'react';
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { Typography } from '@mui/material';

// define the main Forecast component
export default function ForecastToday(props) {

  //pass changed location from child components to forcast cmponent
  const [newLocationForcast, setNewLocationForcast] = useState(props.currentCity);

  const pullLocationForcast = (newFLocation) => {
    setNewLocationForcast(newFLocation);
    props.Globalfunc(newFLocation);
  }
  
   // function to handle opening of dialog
   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
     setOpen(true);
   };
 
   // function to handle closing of dialog
   const handleClose = (event, reason) => {
     if (reason !== 'backdropClick') {
       setOpen(false);
     }
   };
 

  // initialize state variable for tab value
  const [value, setValue] = React.useState(0);

  // function to handle changing of tab value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <div>
        {/* button to open the dialog */}
      <Button
        variant="elevated"
        sx={{ width: 220, color: "#EF7E2A", borderBottom: 3 }}
        onClick={handleClickOpen}
      >
        <ThunderstormIcon sx={{ marginRight: 1 }} />
        <Typography variant="h7 " sx={{ color: "#EF7E2A" }}>
          {" "}
          Weather Forecast
        </Typography>
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>

        <DialogTitle className='forecast-head' sx={{ padding: "5px" }}>
          <div className='forecast-head-text'>
            {newLocationForcast} Weather Forecast
          </div>

          <div className="forecast-close-icon">
            <CloseIcon
              onClick={handleClose}
              sx={{
                fontSize: 20,
                cursor: "pointer"
              }}

            />
          </div>
        </DialogTitle>

        <div style={{ margin: '20px' }}>
        <TodayForecast
              currentCity={props.currentCity}
              pushLocationForcast={pullLocationForcast}
              showSearch={`true`} //prop to hide and show search

            />
        </div>


      </Dialog>
    </div>
  );
}