import { Button, Paper, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Box } from "@mui/system";
import "./Multiplesearch.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RouteIcon from "@mui/icons-material/Route";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

const Multiplesearch = (prop) => {
  // const Searchplan = !prop.Searchplan;
  // const searsplanpop = () => {
  //   prop.Searchplanshow(!Searchplan);
  //   console.log(Searchplan);
  // };
  return (
    // <div className="div1">
    //   <Paper
    //     component="form"
    //     sx={{
    //       p: "2px 4px",
    //       display: "flex",
    //       alignItems: "center",
    //       width: 400,
    //     }}
    //   >
    //     <IconButton sx={{ p: "10px" }} aria-label="menu">
    //       <MenuIcon onClick={searsplanpop} />
    //     </IconButton>

    //     <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
    //       <SearchIcon />
    //     </IconButton>
    //     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    //     <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
    //       <DirectionsIcon />
    //     </IconButton>
    //   </Paper>
    // </div>
    <div>
      <Box>
        <Paper sx={{ width: 350, height: "90vh" }}>
          <div className="upper">
            <Typography
              variant="h4"
              sx={{ color: "white", fontFamily: "cursive" }}
            >
              {" "}
              <ArrowDropDownIcon sx={{ width: 50, height: 30 }} />
              Trip to {prop.heading}
            </Typography>
          </div>
          <div className="searchfields"></div>
          <div className="buttons">
            <div className="but1" style={{ paddingBottom: 30 }}>
              <Button variant="contained">
                <RouteIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7">Optimize Route</Typography>
              </Button>
            </div>
            <div className="but2" style={{ paddingBottom: 30 }}>
              <Button variant="contained">
                <AddLocationAltIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7"> Suggest Locations</Typography>
              </Button>
            </div>
            <div className="but3" style={{ paddingBottom: 30 }}>
              <Button variant="contained">
                <ThunderstormIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7 "> Weather Options</Typography>
              </Button>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Multiplesearch;
