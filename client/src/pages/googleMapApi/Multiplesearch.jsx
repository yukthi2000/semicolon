import { Button, IconButton, Paper, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React, { useEffect } from "react";
import { Box } from "@mui/system";
import "./Multiplesearch.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RouteIcon from "@mui/icons-material/Route";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import Search from "./Searchformulti";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import Searchbox from "./Searchboxformultisearch";
import Forecast from "../weatherApi/Forecast";

const Multiplesearch = (prop) => {
  // const Searchplan = !prop.Searchplan;
  // const searsplanpop = () => {
  //   prop.Searchplanshow(!Searchplan);
  //   console.log(Searchplan);
  // };

  const [searchdata, setSearchdata] = useState([{ lat: 0, lng: 0, Date: "" }]);
  const [data, setData] = useState("");
  const [sedata, setSedata] = useState(["temp"]);

  const adddate = () => {
    setSedata([...sedata, data]);
  };

  const deletefunc = (index) => {
    setSearchdata(searchdata.filter((_, i) => i !== index));
    setSedata(sedata.filter((_, i) => i !== index));
  };

  const getLocation = (data, index) => {
    setSearchdata([
      ...searchdata.slice(0, index),
      data,
      ...searchdata.slice(index + 1),
    ]);
    setData(data);
  };

  useEffect(() => {
    console.log(sedata);
    console.log(searchdata);
  });
  //for weather
  const tripDate = new Date("2023-04-11");

  //pass changed location from child components to this cmponent
  const [globalLocation, setGlobalLocation] = useState("Kandy");

  const pull_newGlobalLocation = (newLocation) => {
    setGlobalLocation(newLocation);
  };

  
  return (
    <div>
      <div>
        {/* <div className="searchfields" style={{ zIndex: 10 }}>
          <Search placeholder={"Enter a location"} />
        </div> */}
      </div>
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
          <div className="searcharea">
            {sedata.map((singledata, index) => (
              <div key={index} className="searchoptions">
                <div className="multisearch">
                  <div className="searchh">
                    <Searchbox
                      location={index === 0 ? "Start Location" : "Location"}
                      currLocation={(data) => getLocation(data, index)}
                      index={index}
                    />
                  </div>
                  {sedata.length - 1 !== index ? (
                    <div>
                      <IconButton onClick={() => deletefunc(index)}>
                        <HighlightOffIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div style={{ paddingLeft: 40 }}></div>
                  )}
                </div>
                {sedata.length - 1 === index ? (
                  <div className="adddest" onClick={adddate}>
                    <IconButton>
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <Typography
                      variant="h7"
                      sx={{ paddingLeft: 2, paddingTop: 1.2 }}
                    >
                      Add Destination
                    </Typography>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>

          <div className="buttons">
            <div className="but1" style={{ paddingBotnotetom: 30 }}>
              <Button
                variant="elevated"
                sx={{ width: 220, color: "#EF7E2A", borderBottom: 3 }}
              >
                <RouteIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7" sx={{ color: "#EF7E2A" }}>
                  Optimize Route
                </Typography>
              </Button>
            </div>
            <div className="but2" style={{ paddingBottom: 30 }}>
              <Button
                variant="elevated"
                sx={{ width: 220, color: "#EF7E2A", borderBottom: 3 }}
              >
                <AddLocationAltIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7" sx={{ color: "#EF7E2A" }}>
                  {" "}
                  Suggest Locations
                </Typography>
              </Button>
            </div>
            <div className="but3" style={{ paddingBottom: 30 }}>
              <Forecast
                currentCity={globalLocation}
                tripDate={tripDate}
                Globalfunc={pull_newGlobalLocation} //passing location function
              />
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Multiplesearch;
