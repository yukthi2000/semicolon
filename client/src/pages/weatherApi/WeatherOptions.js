import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import './WeatherOptions.css';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { green } from '@mui/material/colors';

//importing icons
import {
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiLightning,
    WiNightStormShowers
} from 'weather-icons-react';
import CloseIcon from '@mui/icons-material/Close';

export default function WeatherOptions(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const [checkboxValues, setCheckboxValues] = React.useState({
        cloudy: false,
        sunny: false,
        rain: false,
        thunder: false,
        exHot: false,
        storm: false,
        hot: false,
        averageT: false,
        cold: false,
        exCold: false,
        heavyW: false,
        averageW: false,
        slightW: false,
    });

    const initialValues = {
        cloudy: false,
        sunny: false,
        rain: false,
        thunder: false,
        exHot: false,
        storm: false,
        hot: false,
        averageT: false,
        cold: false,
        exCold: false,
        heavyW: false,
        averageW: false,
        slightW: false,
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleReset = () => {
        setCheckboxValues({});
    };

    const validateForm = (values) => {
        let errors = {};

        // Check if at least one checkbox is checked in each form group
        if (
            !values.cloudy &&
            !values.sunny &&
            !values.rain &&
            !values.thunder &&
            !values.storm
        ) {
            errors.overall = 'Please select at least one weather condition.';
        }

        if (
            !values.exHot &&
            !values.hot &&
            !values.averageT &&
            !values.cold &&
            !values.exCold
        ) {
            errors.temperature = 'Please select at least one temperature range.';
        }

        if (!values.heavyW && !values.averageW && !values.slightW) {
            errors.wind = 'Please select at least one wind speed range.';
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        try {
            const PostData = {

                "tripID": "1234",
                "sunny": checkboxValues.sunny,
                "cloudy": checkboxValues.cloudy,
                "rain": checkboxValues.rain,
                "thunder": checkboxValues.thunder,
                "storm": checkboxValues.storm,
                "exHot": checkboxValues.exHot,
                "hot": checkboxValues.hot,
                "averageT": checkboxValues.averageT,
                "cold": checkboxValues.cold,
                "exCold": checkboxValues.exCold,
                "heavyW": checkboxValues.heavyW,
                "averageW": checkboxValues.averageW,
                "slightW": checkboxValues.slightW
            };
           
            // Send the POST request to the backend server
            const response = await axios.post("http://localhost:3001/WeatherOptions", PostData);

            // Handle the response from the server
            console.log(response.PostData); // Assuming the server sends a success message
        }
        catch (error) {
            console.error('Error creating TripDayWeather entry:', error);
            // Handle error response from the server
        }
    };

    const tripID = props.tripID;

    return (
        <div>

            {/* button to trigger the form */}

            <Button variant="contained" onClick={handleClickOpen} color='warning'>
                Set Preffered Weather
            </Button>

            {/* Dialog box start */}
            <Dialog open={open} onClose={handleClose} >

                {/* Head start */}
                <DialogTitle className='weather-options-head' sx={{ padding: "5px" }}>
                    <div className='weather-options-head-text'>
                        Weather Options
                    </div>

                    <div className="weather-options-close-icon">
                        <CloseIcon
                            onClick={handleClose}
                            sx={{
                                fontSize: 20,
                                cursor: "pointer"
                            }}

                        />
                    </div>
                </DialogTitle>

                {/* Head end */}

                {/* Body start */}

                <div className='weather-options-container'>

                    {/* Form start */}

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >

                        <Form>
                            <div className='weather-options-ins-text-background'>
                                <div className='weather-options-ins-text'>
                                    Please enter your desired weather conditions.
                                </div>

                            </div>

                            <div className='weather-options-subtitle'>
                                Overall
                            </div>
                            <div className='weather-options-form-background'>
                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='sunny' name='sunny'
                                                checked={checkboxValues.sunny || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Sunny
                                        </div>}
                                    />
                                    <WiDaySunny className="weather-options-weather-icons" />

                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='cloudy' name='cloudy'
                                                checked={checkboxValues.cloudy || false}
                                                onChange={handleCheckboxChange}

                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Cloudy
                                        </div>}

                                    />

                                    <WiCloudy className="weather-options-weather-icons" />
                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='rain' name='rain'
                                                checked={checkboxValues.rain || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Rain
                                        </div>}
                                    />

                                    <WiRain className="weather-options-weather-icons" />
                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='thunder' name='thunder'
                                                checked={checkboxValues.thunder || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Thunder
                                        </div>}
                                    />
                                    <WiLightning className="weather-options-weather-icons" />

                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='storm' name='storm'
                                                checked={checkboxValues.storm || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Storm
                                        </div>}
                                    />

                                    <WiNightStormShowers className="weather-options-weather-icons" />
                                </div>


                            </div>

                            <div className='weather-options-subtitle'>
                                Tempreture
                            </div>
                            <div className='weather-options-form-background-tempereture'>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='exHot' name='exHot'
                                                checked={checkboxValues.exHot || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Extremely Hot ({'>'}35 °C)
                                        </div>}
                                    />


                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='hot' name='hot'
                                                checked={checkboxValues.hot || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Hot (30-35 °C)
                                        </div>}
                                    />


                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='averageT' name='averageT'
                                                checked={checkboxValues.averageT || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Average (20 - 30 °C)
                                        </div>}
                                    />


                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='cold' name='cold'
                                                checked={checkboxValues.cold || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Cold (15 - 20 °C)
                                        </div>}
                                    />


                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='exCold' name='exCold'
                                                checked={checkboxValues.exCold || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Extremely Cold ({"<"}15°C)
                                        </div>}
                                    />
                                </div>

                            </div>



                            <div className='weather-options-subtitle'>
                                Wind Speed
                            </div>
                            <div className='weather-options-form-background'>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='heavyW' name='heavyW'
                                                checked={checkboxValues.heavyW || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Heavy Wind
                                        </div>}
                                    />


                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='averageW' name='averageW'
                                                checked={checkboxValues.averageW || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Average Wind
                                        </div>}
                                    />


                                </div>

                                <div className='weather-options-items'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox size='small' id='slightW' name='slightW'
                                                checked={checkboxValues.slightW || false}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: green[800],
                                                    '&.Mui-checked': {
                                                        color: green[600],
                                                    },
                                                }} />}

                                        label={<div className='weather-options-checkbox-label'>
                                            Slight Wind
                                        </div>}
                                    />


                                </div>
                            </div>

                            <div className='weather-options-footer'>
                                <Button type='submit' variant="contained" color="success" >APPLY</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>

            </Dialog>
        </div>
    );


}