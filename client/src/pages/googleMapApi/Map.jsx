import loading from "../../assets/loading (1).gif";
import error from "../../assets/error.gif";
import * as React from "react";
// import Searchbar from "./Searchbar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useState } from "react";
import "./Searc.css";
import Multiplesearch from "./Multiplesearch";
import { PropTypes } from "prop-types";
import Searchbox from "./Searchboxformulti";
import { useContext } from "react";
import { HomeContext } from "../../Context/HomeContext";

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
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import { Button } from "@mui/material";
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";
const heading = "kandy";
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 7.84774,
  lng: 80.7003,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
};

export default function Map(latlng, props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1tZY8x6OG7mt7a2iovZTDIj8SDV6sL8s",
    libraries,
  });
  const [markers, Setmarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [Searchplan, setSearchplan] = useState(false);
  const [Searchplan2, setSearchplan2] = useState(props.Searchplan);
  const [searchdata, setSearchdata] = useState([]);
  const { curr } = useContext(HomeContext);
  const [directionResponse, SetdirectionResponse] = React.useState(null);
  const [distance, setDistance] = React.useState("");

  const onmarkk = (data) => {
    console.log("dadfa");
    //Setmarkers(data);
    Setmarkers((current) => [
      ...current,
      {
        lat: data.lat,
        lng: data.lng,
        time: new Date(),
      },
    ]);
  };
  const Searchplanshow = () => {
    setSearchplan(!Searchplan);
  };

  const recivelocations = (data) => {
    //got searched locations
    console.log("recivelocations");
    setSearchdata(data);
  };
  const optimizeroute = async () => {
    console.log("optimizeroute start");
  await calculateRoute();
  console.log("optimizeroute end");
  };

  async function calculateRoute() {
    console.log("calculateRoute start");
    if (!searchdata[0]) return;
    //eslint-disable-next-line  no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: searchdata[0],
      destination: searchdata[searchdata.length - 1],
      waypoints: searchdata.map((location) => ({ location })),
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    SetdirectionResponse(result);
    console.log("directionResponse", directionResponse);
    setDistance(result.routes[0].legs.reduce((total, leg) => total + leg.distance.value,0)
    );
    console.log("calculateRoute end");
  }

  const onMapClick = React.useCallback((event) => {
    Setmarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={error} />
      </div>
    );
  if (!isLoaded)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={loading} />
      </div>
    );

  return (
    <>
      <div>
        <div
          style={{
            marginTop: 70,
            marginLeft: 10,
            position: "absolute",
            zIndex: 100,
          }}
        >
          {!Searchplan ? (
            <Multiplesearch
              Searchplanshow={Searchplanshow}
              Searchplan={Searchplan}
              heading={heading}
              sendlocations={recivelocations}
              optimizeroute={optimizeroute}
            />
          ) : (
            <div className="searchbar">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  border: 0,
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  <MenuIcon onClick={Searchplanshow} />
                </IconButton>
                <Searchbox placeholder={"Enter Location"} />

                {/* {console.log(markers)} */}
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <DirectionsIcon />
                </IconButton>
              </Paper>
            </div>
          )}
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.5}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            // icon={

            // }
            // onClick={() => {
            //   setSelected(marker);
            // }}
          />
        ))}
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}

        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
            <div>
              <h2>Spot</h2>
              <p>spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {/* {console.log(markers)} */}
      {console.log(curr)}
    </>
  );
}
