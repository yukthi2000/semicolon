import React from "react";
import "./datafortrip.css";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { upperCase } from "lodash";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";

const Datafortrip = (prop) => {
  const [gobutton, setGobutton] = useState(false);
  const gobuttonhandle = () => {
    setGobutton(!gobutton);
    prop.gobuttonhandle();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [weather, setWeather] = useState("");

  const weatherop = (e) => {
    setWeather(e.target.value);
  };
  const [vehicle, setVehicle] = useState("");

  const vehicleop = (e) => {
    setVehicle(e.target.value);
  };
  const username = "yukthi";
  return (
    <div>
      <div className="body">
        <Box
          sx={{
            display: "flex",
            // alignItems: "center",
            flexDirection: "column",
            background: "rgba(19,35,32,0.15)",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
            backdropFilter: "blur(8.5px)",
            borderRadius: "14px",
            height: {
              xs: "60%",
              sm: "60%",
              md: "80%",
              lg: "80%",
              xl: "80%",
            },
            width: {
              xs: "50%",
              sm: "50%",
              md: "35%",
              lg: "35%",
              xl: "35%",
            },
          }}
        >
          <Typography
            sx={{
              marginLeft: 3,
              marginTop: 5,
              textTransform: "upperCase",
              color: "white",
              fontFamily: "cursive",
            }}
            variant="h3"
          >
            Hey {username},
          </Typography>
          <Line />
          <Typography variant="h4" sx={{ color: "#435555" }}>
            <center>Let's Make it Happen!</center>
          </Typography>
          <Line />
          <div className="bottom">
            <div className="date">
              <Typography variant="h5" sx={{ color: "white" }}>
                Date:
              </Typography>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.30)",
                        borderRadius: 2,
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="weather">
            <Typography variant="h5" sx={{ paddingRight: 6, color: "white" }}>
              Prefferd weather:
            </Typography>
            <div>
              {" "}
              <div>
                {/* <select
                style={{
                  width: 150,
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                <option>Sunny</option>
                <option>Rainy</option>
                <option>cloudy </option>
                <option>
                  <div>
                    <WbSunnyIcon sx={{ color: "black" }} />
                  </div>
                </option>
              </select> */}
                <FormControl fullWidth sx={{ width: 150 }}>
                  <InputLabel>
                    <div>
                      <WbSunnyIcon sx={{ color: "#8B8D8E" }} />
                      <CloudIcon sx={{ color: "#8B8D8E" }} />
                      <ThunderstormIcon sx={{ color: "#8B8D8E" }} />
                    </div>
                  </InputLabel>
                  <Select onChange={weatherop} sx={{ color: "white" }}>
                    <MenuItem value="sunny">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "cenetr",
                        }}
                      >
                        Sunny <WbSunnyIcon />
                      </div>
                    </MenuItem>
                    <MenuItem value="rainy">
                      Rainy <CloudIcon />
                    </MenuItem>
                    <MenuItem value="cloudy">
                      Cloudy
                      <ThunderstormIcon />
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="vehicle">
            <Typography variant="h5" sx={{ paddingRight: 11, color: "white" }}>
              Vehicle Type:
            </Typography>
            <div>
              {" "}
              <div>
                <FormControl fullWidth sx={{ width: 150 }}>
                  <InputLabel>
                    <div>
                      <DirectionsCarIcon sx={{ color: "#8B8D8E" }} />
                      <TwoWheelerIcon sx={{ color: "#8B8D8E" }} />
                      <AirportShuttleIcon sx={{ color: "#8B8D8E" }} />
                    </div>
                  </InputLabel>
                  <Select onChange={vehicleop} sx={{ color: "white" }}>
                    <MenuItem value="car">
                      Car <DirectionsCarIcon />
                    </MenuItem>
                    <MenuItem value="van">
                      Van <AirportShuttleIcon />
                    </MenuItem>
                    <MenuItem value="bike">
                      Bike
                      <TwoWheelerIcon />
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          {gobutton ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 30,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#132320",
                  width: 100,
                  "&:hover": { backgroundColor: "#368C18" },
                }}
              >
                <SendIcon />
                <SendIcon />
                <SendIcon />
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 30,
              }}
            >
              <Button
                variant="contained"
                onClick={gobuttonhandle}
                sx={{
                  backgroundColor: "#132320",
                  width: 100,
                  "&:hover": { backgroundColor: "#368C18" },
                }}
              >
                Goooo!
              </Button>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Datafortrip;

const Maincontainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
`;

const Line = styled.hr`
  border: 10px solid;
  color: #ef7e2a;
  width: 80%;
  margin-left: 45px;
  opacity: 1;
`;
