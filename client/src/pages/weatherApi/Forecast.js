
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



// define a custom component for a tab panel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// define prop types for the custom tab panel component
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// define the main Forecast component
export default function Forecast(props) {

  //pass changed location from child components to forcast cmponent
  const [newLocationForcast, setNewLocationForcast] = useState('');

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

      {/* the dialog itself */}
      <Dialog open={open} onClose={handleClose} fullWidth>

        <DialogTitle className='forecast-head' sx={{ padding: "5px" }}>
          <div className='forecast-head-text'>
            {props.currentCity} Weather Forecast
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


        {/* tabs for different forecast views */}
        <Box sx={{ borderBottom: 0, borderColor: 'divider', padding: "10px" }}>


          <Tabs
            value={value}
            onChange={handleChange}

            variant='scrollable'
            sx={{ "& .MuiTabs-indicator": { backgroundColor: "#F28330", height: "3px" }, "& .Mui-selected": { borderBottom: "2px solid green" } }}
            allowScrollButtonsMobile>

            <Tab
              sx={{ "&.Mui-selected": { color: "#F28330" } }}
              label={
                <div className='forecast-tab-label'>
                  Trip Day
                </div>}
              wrapped

            />

            <Tab
              sx={{ "&.Mui-selected": { color: "#F28330" } }}
              label={
                <div className='forecast-tab-label'>
                  Today
                </div>}
              wrapped
            />
            <Tab
              sx={{ "&.Mui-selected": { color: "#F28330" } }}
              label={
                <div className='forecast-tab-label'>
                  Next 7 Days
                </div>}
              wrapped
            />

          </Tabs>
        </Box>

        <div className="tab-panel-container">

          {/* Tab panel for tripday */}
          <TabPanel value={value} index={0}>

            <TripDayForecast
              currentCity={props.currentCity}
              tripDate={props.tripDate}
              pushLocationForcast={pullLocationForcast}
              showSearch={`true`} //prop to hide and show search
            />

          </TabPanel>


          {/* Tab panel for today */}
          <TabPanel value={value} index={1}>

            <TodayForecast
              currentCity={props.currentCity}
              pushLocationForcast={pullLocationForcast}
              showSearch={`true`} //prop to hide and show search

            />



          </TabPanel>


          {/* Tab pannel for Next 7 days */}
          <TabPanel value={value} index={2}>

            <SevenDayForecast
              currentCity={props.currentCity}
              tripDate={props.tripDate}
            />


          </TabPanel>

        </div>


      </Dialog>
    </div>
  );
}