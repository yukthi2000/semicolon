import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import "./Searc.css";
import Multiplesearch from "./Multiplesearch";
import { PropTypes } from "prop-types";
import Header2 from "../../componets/Header2";
import Sidepan from "./Sidepan";

import Searchbox from "./Searchboxformulti";

import { useRef, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

const TopSearchbar = () => {

    const [Searchplan, setSearchplan] = useState(false);

    const [direction, setDirection] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1tZY8x6OG7mt7a2iovZTDIj8SDV6sL8s",
    libraries: ["places"], //enable googlemap places api
  });
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  const [originstate, setOriginstate] = useState("");

  const inputvalue = () => {
    setOriginstate(originRef.current.value);
  };

  //   /** @type React.MutableRefObject<HTMLInputElement> */
  //   const destinationRef = useRef();
  //eslint-disable-next-line  no-undef

  const restrictions = {
    country: "lk", //restrict search locations into srilanka
  };

  const options = {
    strictBounds: true,
  };
  const handledirection = () => {
    setDirection(!direction);
  };

  const Searchplanshow = () => {
    setSearchplan(!Searchplan);
  };
  return (
    <div>
      <div className="searchbar">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon onClick={Searchplanshow} />
          </IconButton>
          <div className="search_container">
            <Autocomplete restrictions={restrictions} options={options}>
              <input
                type={"text"}
                placeholder="Location"
                ref={originRef}
                onBlur={inputvalue} //after done with changes
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  fontFamily: "Courier New",
                  width: "250px",
                  border: "2px solid white",
                  height: "50px",
                }}
              ></input>
            </Autocomplete>
          </div>

          {/* {console.log(markers)} */}
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          {direction ? (
            ""
          ) : (
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={handledirection}
            >
              <DirectionsIcon />
            </IconButton>
          )}
        </Paper>
      </div>
    </div>
  );
};
export default TopSearchbar;
