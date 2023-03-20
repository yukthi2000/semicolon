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
const Datafortrip = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const username = "user";
  return (
    <div className="body">
      <Box
        sx={{
          display: "flex",
          // alignItems: "center",
          flexDirection: "column",
          background: "rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
          backdropFilter: "blur(8.5px)",
          borderRadius: "14px",
          height: {
            xs: "60%",
            sm: "60%",
            md: "70%",
            lg: "70%",
            xl: "70%",
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
          }}
          variant="h3"
        >
          Hey {username},
        </Typography>
        <Line />
        <Typography variant="h4" sx={{ color: "white" }}>
          <center>Let's Make it Happen!</center>
        </Typography>
        <Line />
        <div className="date">
          <Typography variant="h5">Date:</Typography>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <div>
              <div>
                <div></div>
                <div>
                  <Button id="basic-button" onClick={handleClick}>
                    Dashboard
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
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
  color: black;
  width: 80%;
  margin-left: 45px;
`;
