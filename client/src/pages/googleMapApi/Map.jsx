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
import { useContext,useEffect } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { InfoBox } from "@react-google-maps/infobox";
import {Box} from "@mui/material";


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
  const [searchdata2, setSearchdata2] = useState([]);
  const { curr } = useContext(HomeContext);
  const [directionResponse, SetdirectionResponse] = React.useState(null);
  const [distance, setDistance] = React.useState(0);
  const [searchDataWithoutFirstAndLast, setSearchDataWithoutFirstAndLast] = useState([]);
  const [firstAndLastSearchData, setFirstAndLastSearchData] = useState([]);
  const [distanceMarker, setDistanceMarker] = useState(null);
  const[duration,setDuration]=useState(0);

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

  const mapWithoutFirstAndLast = (array) => {
    return array.slice(1, array.length-1);
  };

  const recivelocations = (data) => {
    console.log("recivelocations");
    console.log(data);
  
   
  
    const [firstElement, ...restElement] = data;
    const lastElement = data[data.length - 1];
    const restElements = data.slice(1, data.length-1);

    setFirstAndLastSearchData([ firstElement,lastElement ]);
    setSearchDataWithoutFirstAndLast(restElements);
  
 
  };
  
  useEffect(() => {
    // This will log the updated state values
    console.log(firstAndLastSearchData);
    console.log(searchDataWithoutFirstAndLast);
    calculateRoute();
  }, [firstAndLastSearchData, searchDataWithoutFirstAndLast]);
  
  useEffect(() => {
    if (distanceMarker) {
      distanceMarker.setMap(mapRef.current);
    }
  }, [distanceMarker]);

  // const optimizeroute = async () => {
  //   console.log("optimizeroute start");
  // await calculateRoute();
  // console.log("optimizeroute end");
  // };

  async function calculateRoute() {
    console.log("calculateRoute start");
    if (!firstAndLastSearchData[0]) return;
    //eslint-disable-next-line  no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: firstAndLastSearchData[0],
      destination: firstAndLastSearchData[1],
      waypoints: searchDataWithoutFirstAndLast.map((location) => ({ location })),
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    SetdirectionResponse(result);
    console.log("directionResponse", directionResponse);
    
    const routedetails = result.routes[0].legs.reduce((total, leg) => {
      const legDistance = leg.distance.value;
      const legDuration = leg.duration.value;
      return { distance: total.distance + legDistance, duration: total.duration + legDuration };
    }, { distance: 0, duration: 0 });
    
    setDistance(routedetails.distance);
    setDuration(routedetails.duration);
  console.log(routedetails);

    // Calculate the midpoint between start and end locations
    const startLocation = result.routes[0].legs[0].start_location;
    const endLocation = result.routes[0].legs[result.routes[0].legs.length - 1].end_location;
    //eslint-disable-next-line  no-undef
    const midpoint = google.maps.geometry.spherical.interpolate(startLocation, endLocation, 0.5);
    console.log(midpoint);
  
    

 if (distanceMarker) {
    distanceMarker.setMap(null);
  }
  // Create the distance marker

  // const newDistanceMarker = new google.maps.Marker({
  //   position: midpoint,
  //   map: mapRef.current,
  //   label: `${(distance / 1000).toFixed(1)} km`,
  // });

   //eslint-disable-next-line  no-undef
   const infoBox = new InfoBox({
    content: `<div style="background-color: #fff; border: 1px solid #999; box-shadow: rgba(0,0,0,0.2) 0px 2px 6px; font-family: Arial,sans-serif; font-size: 12px; line-height: 16px; padding: 5px 10px; min-width: 80px;">
    <span style="font-weight: bold; display: block; margin-bottom: 5px;">${(routedetails.distance / 1000).toFixed(1)} km</span>
    <span style="color: #666; font-size: 11px;">${(routedetails.duration/60).toFixed(2)} mins</span>
  </div>`,
    position: midpoint,
    map: mapRef.current, 
  });
  
  // Set the InfoBox options
  infoBox.setOptions({
    alignBottom: true,
     //eslint-disable-next-line  no-undef
    pixelOffset: new google.maps.Size(0,  0),
    closeBoxURL: '',
    pane: 'floatPane',
    enableEventPropagation: true,
  });
  
  setDistanceMarker(infoBox);

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
              //optimizeroute={calculateRoute}
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
        //onClick={onMapClick}
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
          <DirectionsRenderer options={{
            polylineOptions: {
              strokeColor: '#0000FF',
              strokeOpacity: 0.7,
              strokeWeight: 4,
            }
          }} directions={directionResponse} />
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
      <button type="button" onClick={recivelocations} >asasfa</button>
      {/* {console.log(markers)} */}
      {console.log(curr)}
    </>
  );
}
