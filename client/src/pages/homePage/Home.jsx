import React from "react";
import homeBg from "../../assets/WhatsApp Image 2023-04-04 at 17.50.02.jpeg";
import "./Home.css";
import Button from "@mui/material/Button";
import Search from "./Search";
import { Link } from "react-router-dom";

import Header from "../../componets/Header";
import Register from "../login/Register";
import Header2 from "../../componets/Header2";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { height, width } from "@mui/system";

const Home = () => {
  const [startlocation, setstartLocation] = React.useState([]);
  const [endlocation, setendLocation] = React.useState([]);

  const setLocationstart = (data) => {
    setstartLocation({ lat: data.lat, lng: data.lng, time: new Date() });
  };
  const setLocationend = (data) => {
    setendLocation({ lat: data.lat, lng: data.lng, time: new Date() });
  };
  return (
    <div>
      {React.useEffect(() => {
        console.log(startlocation);
        console.log(endlocation);
      })}
      <div>
        <div>
          <Header2 />
        </div>
        <div className="Backgroung-img">
          <img
            src={homeBg}
            alt=""
            height="750px"
            width="100%"
            position="fixed"
          />
          <div className="content">
            <p>
              <div className="w1">LIVE YOUR</div>
              <div className="w2">ADVENTURE</div>
              <div className="p">
                Don't wait until tomorrow, discover your
                <br />
                adventure now and feel the sensation of
                <br /> closeness to nature around you
              </div>
            </p>
          </div>
          <div className="box" />
          <div>
            <div className="destination1">
              <Search
                placeholder="Start Location"
                setLocations={setLocationstart}
              />{" "}
            </div>
            <div className="destination2">
              <Search
                placeholder="End Location"
                setLocations={setLocationend}
              />{" "}
            </div>
          </div>

          <Button
            href="/googleMapApi"
            sx={{
              marginLeft: "auto",
              color: "white",
              backgroundColor: "#EF7E2A",
              top: "-28vh",
              left: "89vh",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "white",
                color:"#EF7E2A"
              }
            }}
          >
            Go
          </Button>
        </div>
        <div>
          <p className="p2">
            
          </p>
          <div></div>
        </div>
      </div>
     <div className="gallery"></div>
     <div className="place"></div>
     <div className="get_start"></div>
    </div>
  );
};

export default Home;
