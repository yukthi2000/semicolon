import loading from "../../assets/loading (1).gif";
import error from "../../assets/error.gif";
import * as React from "react";

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
import Header2 from "../../componets/Header2";
import Sidepan from "./Sidepan";
import { useEffect, useRef } from "react";
import Searchbox from "./Searchboxformulti";
import Ratings from "./singleLocationData/Ratings";
import Viewer from "./singleLocationData/Viewer";

import { Box } from "@mui/material";
import axios from "axios";
import "./singleLocationData/rating.css";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
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
    googleMapsApiKey: "AIzaSyCjTfIEci5TjcUCYMifDVtiC6nt7tFRqko",
    libraries,
  });
  const [markers, Setmarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [Searchplan, setSearchplan] = useState(false);
  const [Searchplan2, setSearchplan2] = useState(props.Searchplan);
  const [search, setSearch] = useState(false);
  const [direction, setDirection] = useState(false);
  const [mylat, setMylat] = useState(0);
  const [mylng, setMylng] = useState(0);

  const [directionResponse, SetdirectionResponse] = React.useState(null);
  const [distance, setDistance] = React.useState("");
  const [duration, setduration] = React.useState("");
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);

  const [dataFromChild, setDataFromChild] = useState("");
  const [clearroute, setClearroute] = React.useState(false);
  const [isLocationEntered, setIsLocationEntered] = React.useState(true);
  const [listofdata, setListofdata] = useState([]);
  const [sidepan, setSidepan] = React.useState(false);
  //connection for database for retrive reviews
  useEffect(() => {
    axios
      .get("http://localhost:3001/Ratings/location", {
        params: {
          location: origin,
        },
      })
      .then((response) => {
        setListofdata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [origin]);

  const originfromsearch = (data) => {
    setOrigin(data);
    if (data.length > 0) {
      setIsLocationEntered(true);
    }

    //console.log(data);
  };

  const singlelocation = async () => {
    if (origin.length > 0) {
      setIsLocationEntered(true);
      setSidepan(true);
    } else {
      setIsLocationEntered(false);
      setSidepan(false);
    }
    console.log("singlelocation function called");
    console.log("Origin:", origin);

    try {
      const results = await getGeocode({ address: origin });
      const { lat, lng } = await getLatLng(results[0]);
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);

      Setmarkers([
        {
          lat: lat,
          lng: lng,
          time: new Date(),
        },
      ]);
    } catch (error) {
      console.log("Error fetching geolocation:", error);
    }
    console.log("XXXX");
  };

  const destinationfromsearch = (data) => {
    setDestination(data);
    if (data.length > 0) {
      setIsLocationEntered(true);
    }
    //console.log(data);
  };

  async function calculateRoute() {
    console.log("XXXX");
    if (destination.length > 0) {
      setIsLocationEntered(true);
    } else {
      setIsLocationEntered(false);
    }
    setClearroute(true);
    if (!origin) return;
    //eslint-disable-next-line  no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: origin,
      destination: destination,
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    SetdirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance.text);
    console.log(result, distance);
  }

  const handledirection = () => {
    setDirection(!direction);
  };

  const secondsearchmenuhandler = () => {
    handledirection();
    CleareRoute();
  };
  function CleareRoute() {
    setClearroute(false);
    //window.location.reload(); rerender whole page,not thart much efficient way
    setDistance("");
    setduration("");

    // setOrigin(null);
    origin = "";
    // setDestination(null);
    destination = "";
    SetdirectionResponse(null);
    // console.log(directionResponse, distance);
  }
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setMylat(position.coords.latitude);
  //     setMylng(position.coords.longitude);
  //     console.log(position);
  //     Setmarkers(() => [
  //       {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //         time: new Date(),
  //       },
  //     ]);
  //   });
  // }, []);

  const handlesearch = () => {
    setSearch(!search);
  };

  // const onmarkk = (data) => {
  //   console.log("dadfa");
  //   Setmarkers(data);
  // };
  const Searchplanshow = () => {
    setSearchplan(!Searchplan);
  };

  // const onMapClick = React.useCallback(
  //   (event) => {
  //     Setmarkers((current) => [
  //       ...current,
  //       {
  //         lat: event.latLng.lat(),
  //         lng: event.latLng.lng(),
  //         time: new Date(),
  //       },
  //     ]);
  //   },

  // );

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(
    ({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });

      if (origin.length > 0) {
        mapRef.current.setZoom(10); // Zoom out to original level

        setTimeout(() => {
          mapRef.current.setZoom(14); // Zoom in to new location
        }, 1000); // Delay of one second
      } else {
        mapRef.current.setZoom(14); // Zoom in to new location
      }
    },
    [origin]
  );

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
        <Header2 />
        <div
          style={{
            marginTop: 70,
            marginLeft: 10,
            position: "absolute",
            zIndex: 100,
          }}
        >
          {search ? (
            Searchplan ? (
              <Multiplesearch
                Searchplanshow={Searchplanshow}
                Searchplan={Searchplan}
                heading={heading}
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
                  }}
                >
                  <IconButton sx={{ p: "10px" }} aria-label="menu">
                    <MenuIcon onClick={Searchplanshow} />
                  </IconButton>
                  <Searchbox datafromsearch={originfromsearch} />

                  {/* {console.log(markers)} */}
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={singlelocation}
                  >
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
                {!direction ? (
                  ""
                ) : (
                  <div style={{ paddingTop: 3 }}>
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
                        <MenuIcon onClick={secondsearchmenuhandler} />
                      </IconButton>
                      <Searchbox
                        datafromsearch={destinationfromsearch}
                        update={clearroute}
                      />
                      {/* put a placeholder */}

                      {/* {console.log(markers)} */}
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton
                        color="primary"
                        sx={{ p: "10px" }}
                        aria-label="directions"
                        onClick={calculateRoute}
                      >
                        <DirectionsIcon />
                      </IconButton>
                    </Paper>
                  </div>
                )}
              </div>
            )
          ) : (
            <Sidepan handlesearch={handlesearch} />
          )}
        </div>
      </div>
      <div style={{ backgroundColor: "cyan" }}>
        {/*viewerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */}

        {sidepan ? (
          <div className="viewer">
            <Box>
              <Paper
                sx={{
                  width: 400,
                  borderRadius: 0,
                  zIndex: 9999,
                  position: "absolute",
                  height: 250,
                  marginTop: 25,
                  marginLeft: 1.5,
                }}
              >
                <div
                  className="locawe"
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    marginRight: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    height: 55,
                  }}
                >
                  <div className="loc">{origin} name</div>
                  <div className="we">weather</div>
                </div>
                <hr />
                <div
                  className="title"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  Reviews
                </div>
                <div className="reviews-container">
                  <div className="reviews">
                    {listofdata.map((value, key) => {
                      return (
                        <div className="all" key={key}>
                          <div className="card">
                            <div className="rating">{value.rating}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Paper>
            </Box>
          </div>
        ) : (
          ""
        )}
        {/*viewerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */}

        {/*Imagesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}

        {sidepan ? (
          <div className="viewer">
            <Box>
              <Paper
                sx={{
                  width: 400,
                  borderRadius: 4,
                  zIndex: 9999,
                  position: "absolute",
                  height: 250,
                  marginTop: 60,
                  marginLeft: 1.5,
                }}
              >
                dfasfasfa
              </Paper>
            </Box>
          </div>
        ) : (
          ""
        )}

        {/*Imagesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.5}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.slice(0, 1).map(
          (marker) => (
            console.log(marker),
            (
              <Marker
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(10, 10),
                  anchor: new window.google.maps.Point(25, 25),
                }}
                onLoad={() => {
                  panTo({ lat: marker.lat, lng: marker.lng }); // Zoom in to the marker's position when it's loaded
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            )
          )
        )}
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}

        {/* {!clearroute && <DirectionsRenderer directions={null} />} */}
        {markers.slice(0, 1).map((marker) =>
          selected ? (
            <InfoWindow
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                scaledSize: new window.google.maps.Size(10, 10),
                anchor: new window.google.maps.Point(15, 15),
              }}
            >
              <div>{origin}</div>
            </InfoWindow>
          ) : null
        )}
      </GoogleMap>
      {!isLocationEntered && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "9999",
            width: "300px",
            height: "50px",

            backgroundColor: "#f8d7da",
            padding: "10px",
            borderRadius: "6px",
            textAlign: "center",
            animationName: "highlight",
            animationDuration: "1.5s",
            animationIterationCount: "infinite",
            boxShadow: "0 0 0 2px #f8d7da",
          }}
        >
          <p
            style={{
              background: "none",
              border: "none",
              color: "red",
              zIndex: 9999,
            }}
          >
            Please enter a location. {console.log("fsDFad")}
          </p>
        </div>
      )}
    </>
  );
}
