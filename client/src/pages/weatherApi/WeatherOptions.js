import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { green } from '@mui/material/colors';
import { FormGroup } from '@mui/material';
import './WeatherOptions.css';


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
        heavy: false,
        averageW: false,
        slight: false,
        test:false,
    }

    const onSubmit = (data) => {
        console.log(data);
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

    const [checked, setChecked] = React.useState({
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
        heavy: false,
        averageW: false,
        slight: false,
    });

    const handleClear = () => {
        setChecked({
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
            heavy: false,
            averageW: false,
            slight: false,
        });
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

                    <Formik initialValues={initialValues} onSubmit={onSubmit} >
                        <Form>
                            <FormGroup>
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

                                                    checked={checked.sunny}
                                                    onChange={() =>
                                                        setChecked({ ...checked, sunny: !checked.sunny })
                                                    }
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
                                                    checked={checked.cloudy}
                                                    onChange={() =>
                                                        setChecked({ ...checked, cloudy: !checked.cloudy })
                                                    }
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
                                                    checked={checked.rain}
                                                    onChange={() =>
                                                        setChecked({ ...checked, rain: !checked.rain })
                                                    }
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

                                                    checked={checked.thunder}
                                                    onChange={() =>
                                                        setChecked({ ...checked, thunder: !checked.thunder })
                                                    }
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
                                                    checked={checked.storm}
                                                    onChange={() =>
                                                        setChecked({ ...checked, storm: !checked.storm })
                                                    }
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
                                                    checked={checked.exHot}
                                                    onChange={() =>
                                                        setChecked({ ...checked, exHot: !checked.exHot })
                                                    }
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
                                                    checked={checked.hot}
                                                    onChange={() =>
                                                        setChecked({ ...checked, hot: !checked.hot })
                                                    }
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
                                                    checked={checked.averageT}
                                                    onChange={() =>
                                                        setChecked({ ...checked, averageT: !checked.averageT })
                                                    }
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
                                                    checked={checked.cold}
                                                    onChange={() =>
                                                        setChecked({ ...checked, cold: !checked.cold })
                                                    }
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
                                                    checked={checked.exCold}
                                                    onChange={() =>
                                                        setChecked({ ...checked, exCold: !checked.exCold })
                                                    }
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
                                                    checked={checked.heavy}
                                                    onChange={() =>
                                                        setChecked({ ...checked, heavy: !checked.heavy })
                                                    }
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
                                                    checked={checked.averageW}
                                                    onChange={() =>
                                                        setChecked({ ...checked, averageW: !checked.averageW })
                                                    }
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

                                                    checked={checked.slight}
                                                    onChange={() =>
                                                        setChecked({ ...checked, slight: !checked.slight })
                                                    } sx={{
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

                                <div className='switchContainer'>

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                defaultChecked
                                                sx={{

                                                    '& .Mui-checked .MuiSwitch-thumb': {
                                                        bgcolor: '#F28330',
                                                    },
                                                    '& .Mui-checked .MuiSwitch-track': {
                                                        bgcolor: 'lightgrey',
                                                    },

                                                }}
                                            />
                                        }

                                        label={<div className='weather-options-switch-label'>
                                            Show weather bubbles
                                        </div>} />

                                </div>

                                <div className='weather-options-footer'>

                                    <Button variant="text" onClick={handleClear}  >CLEAR ALL</Button>
                                    <Button type="submit" variant="contained" >APPLY</Button>


                                </div>


                            </FormGroup>
                        </Form>
           

                    </Formik>
                </div>

            </Dialog>
        </div>
    );


}