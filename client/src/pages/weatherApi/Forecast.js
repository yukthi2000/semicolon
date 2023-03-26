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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

export default function Forecast(props) {

  //pass changed location from child components to forcast cmponent
  const [newLocationForcast, setNewLocationForcast] = useState('');

  const pullLocationForcast = (newFLocation) => {
    setNewLocationForcast(newFLocation);
    props.Globalfunc(newFLocation);
  }



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open forecast
      </Button>


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
            />

          </TabPanel>


          {/* Tab panel for today */}
          <TabPanel value={value} index={1}>

            <TodayForecast
              currentCity={props.currentCity}
              pushLocationForcast={pullLocationForcast} />



          </TabPanel>


          {/* Tab pannel for Next 7 days */}
          <TabPanel value={value} index={2}>

            <SevenDayForecast
              currentCity={props.currentCity}
              tripDate={props.tripDate}
            // pull_location_func={pull_newLocation}
            />


          </TabPanel>

        </div>


      </Dialog>
    </div>
  );
}