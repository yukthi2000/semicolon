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
import Forecast from "../../weatherApi/Forecast";
import axios from "axios";
import ScoreIcon from "@mui/icons-material/Score";
import PostTripDayLocationList from "../../weatherApi/WeatherScore/PostTripDayLocationList";
import WeatherScoreList from "../../weatherApi/WeatherScore/WeatherScoreList";

function Multiplesearch(props) {
  // const Searchplan = !prop.Searchplan;
  // const searsplanpop = () => {
  //   prop.Searchplanshow(!Searchplan);
  //   console.log(Searchplan);
  // };

  const [searchdata, setSearchdata] = useState([]);
  const [data, setData] = useState("");
  const [sedata, setSedata] = useState(["temp"]);
  const { startlocation } = props;

  const adddate = () => {
    setSedata([...sedata, data]);
  };

  const deletefunc = (index) => {
    setSearchdata(searchdata.filter((_, i) => i !== index));
    setSedata(sedata.filter((_, i) => i !== index));
  };

  const getLocation = (data, index) => {
    props.indexsend(index);
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


  //pass changed location from child components to this cmponent
  const [globalLocation, setGlobalLocation] = useState("Sri Lanka");

  const pull_newGlobalLocation = (newLocation) => {
    setGlobalLocation(newLocation);
  };

  function handleSave() {
    //saveData(searchdata);
    props.sendlocations(searchdata);
    // props.optimizeroute(true);
  }


  //Harshana  

  //for weather
  const tripDate = new Date(props.dateinplantrip);
  const tripID = '92'
  
  const [SuggestButtonTxt,setSuggestButtonTxt] = useState("Show Suggestions");
  function handleSuggest() {
    props.sendSuggestlocations(searchdata);
    props.sendMarkerVisibility((SuggestButtonTxt == "Show Suggestions") ? true : false);
    setSuggestButtonTxt((SuggestButtonTxt == "Show Suggestions")?"Hide Suggestions" : "Show Suggestions");
  }

  const [PostToggle, setPostToggle] = useState(false);
  function handleWeatherPost() {
    //console.log(searchdata);
    setPostToggle(true);
  }

  //Harshana End

  function saveData(data) {
    axios
      .post("http://localhost:3001/Locations", data)
      .then((res) => {
        console.log(res.data); // log response data to console
        alert(res.data); // show response data in alert dialog
        res.send("Successfull");
      })
      .catch((error) => console.error(error));
  }
  // axios.get("http://localhost:3001/Locations").then((responses) => {
  //   console.log("gaeg");
  // });

  return (
    <Box>
      {/* <Box> */}
      {/* <Box className="searchfields" style={{ zIndex: 10 }}>
          <Search placeholder={"Enter a location"} />
        </Box> */}
      {/* </Box> */}
      <Box>
        <Paper sx={{ width: 350, height: "90vh" }}>
          <Box className="upper">
            <Typography
              variant="h4"
              sx={{ color: "white", fontFamily: "cursive" }}
            >
              {" "}
              <ArrowDropDownIcon sx={{ width: 50, height: 30 }} />
              Trip to {props.heading}
            </Typography>
          </Box>
          <Box className="searcharea">
            {sedata.map((singledata, index) => (
              <Box key={index} className="searchoptions">
                <Box className="multisearch">
                  <Box className="searchh">
                    <Searchbox
                      location={index === 0 ? "Start Location" : "Location"}
                      currLocation={(data) => getLocation(data, index)}
                      index={index}
                    />
                  </Box>
                  {sedata.length - 1 !== index ? (
                    <Box>
                      <IconButton onClick={() => deletefunc(index)}>
                        <HighlightOffIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box style={{ paddingLeft: 40 }}></Box>
                  )}
                </Box>
                {sedata.length - 1 === index ? (
                  <Box className="adddest" onClick={adddate}>
                    <IconButton>
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <Typography
                      variant="h7"
                      sx={{ paddingLeft: 2, paddingTop: 1.2 }}
                    >
                      Add Destination
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            ))}
          </Box>

          <Box className="buttons">
            <Box className="but1" style={{ paddingBotnotetom: 0 }}>
              <Button
                variant="elevated"
                sx={{ width: 220, color: "#EF7E2A", borderBottom: 3 }}
                onClick={handleSave}
              >
                <RouteIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7" sx={{ color: "#EF7E2A" }}>
                  Optimize Route
                </Typography>
              </Button>
            </Box>
            <Box className="but2" style={{ paddingBottom: 0 }}>
              <Button
                variant="elevated"
                sx={{ width: 220, color: "#EF7E2A", borderBottom: 3 }}
                onClick={handleSuggest}
              >
                <AddLocationAltIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7" sx={{ color: "#EF7E2A" }}>
                  {" "}
                 { SuggestButtonTxt}  {/*  suggest Locations */}
                </Typography>
              </Button>
            </Box>
            <Box className="but4" style={{ paddingBottom: 0 }}>
              <Button
                variant="elevated"
                sx={{ width: 220, color: "#EF7E2A", borderBottom: 3 }}
                onClick={handleWeatherPost}
              >
                <ScoreIcon sx={{ marginRight: 1 }} />
                <Typography variant="h7" sx={{ color: "#EF7E2A" }}>
                  {" "}
                  Weather Score
                </Typography>
              </Button>
            </Box>
            <Box className="but3" style={{ paddingBottom: 0 }}>
              <Forecast
                currentCity={globalLocation}
                tripDate={tripDate}
                Globalfunc={pull_newGlobalLocation} //passing location function
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      //Harshana
      {PostToggle &&
        <PostTripDayLocationList
          locationList={searchdata}
          tripID={tripID}
          tripDate={tripDate}
        />
      }
      

    </Box>
  );
}

export default Multiplesearch;
