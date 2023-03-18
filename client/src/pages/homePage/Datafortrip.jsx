import React from "react";
import "./datafortrip.css";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { upperCase } from "lodash";
const Datafortrip = () => {
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
          height: "80vh",
          width: {
            xs: "25%",
            sm: "25%",
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
  width: 350px;
  margin-left: 45px;
`;
