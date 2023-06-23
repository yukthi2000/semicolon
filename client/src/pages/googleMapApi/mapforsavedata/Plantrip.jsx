import loading from "../../../assets/loading (1).gif";
import error from "../../../assets/error.gif";
import * as React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useState, useRef } from "react";
import "./Searc.css";
import Multiplesearch from "./Multiplesearch";
import { PropTypes } from "prop-types";
import Header2 from "../../../componets/Header2";
//import Sidepan from "./Sidepan";
import Datafortrip from "./Datafortrip";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../../Context/HomeContext";
import { InfoBox } from "@react-google-maps/infobox";
import { Box } from "@mui/material";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { InfoWindowF } from "@react-google-maps/api";
import {
  NotificationContainer,
  NotificationManager,
} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
import { useNavigate } from "react-router-dom";

import Showtrips from "../ShowTrips/Showtrips";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

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

export default function Tripplan(latlng, props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCjTfIEci5TjcUCYMifDVtiC6nt7tFRqko",
    libraries,
  });
  const [markers, Setmarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [Searchplan, setSearchplan] = useState(false);
  const [Searchplan2, setSearchplan2] = useState(props.Searchplan);
  const [search, setSearch] = useState(false);
  const [gobutton, setGobutton] = useState(true);
  const { curr } = useContext(HomeContext);
  const [directionResponse, SetdirectionResponse] = React.useState(null);
  const [distance, setDistance] = React.useState(0);
  const [searchDataWithoutFirstAndLast, setSearchDataWithoutFirstAndLast] =
    useState([]);
  const [firstAndLastSearchData, setFirstAndLastSearchData] = useState([]);
  const [distanceMarker, setDistanceMarker] = useState(null);
  const [all, setAll] = useState([]);
  const [newall, setNewall] = useState([]);
  const [distancedest, setDistancedest] = useState([0]);
  const [duration, setDuration] = useState(0);
  const newDistances = [];
  const newLocations = [];
  const arrangedmiddlelocations = [];
  const [loading, setloading] = useState(false);
  const [locationsstart, setlocationsstart] = useState([]);
  const [isOneEntered, setisOneEntered] = React.useState(true);
  const [issecondentered, setissecondentered] = React.useState(true);
  let indexloc = 0;
  const [currtripid, setcurrtripid] = useState();
  const [confirmed, setconfirmed] = useState(false);

  const navigate = useNavigate();

  const tripid = (data) => {
    console.log(data);
    setcurrtripid(data);
  };

  //location indexes

  const indexsend = (data) => {
    indexloc = data;
    console.log(data);
    console.log(indexloc);
    if (indexloc === 0) {
      setisOneEntered(true);
      return;
    } else if (indexloc === 1) {
      setissecondentered(true);
      return;
    } else {
      setissecondentered(true);
      setisOneEntered(true);
    }
  };

  const gobuttonhandle = () => {
    setGobutton(!gobutton);
  };

  const handlesearch = () => {
    setSearch(!search);
  };

  const onmarkk = (data) => {
    console.log("dadfa");
    Setmarkers(data);
  };
  const Searchplanshow = () => {
    setSearchplan(!Searchplan);
  };

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

  const recivelocations = (data) => {
    NotificationManager.info({
      title: "Trip saved",
      message: "click here to show trips",
      timeOut: "200000",
      onClick: () => {
        navigate("/userProfile/plannedTrip/plannedTrip");
      },
    });

    console.log("recivelocations");
    console.log(data);

    if (data.length === 0) {
      setisOneEntered(false);
    } else if (data.length === 1) {
      setissecondentered(false);
    } else {
      setissecondentered(true);
      setisOneEntered(true);
    }
    console.log(isOneEntered);
    console.log(issecondentered);

    const [firstElement, ...restElement] = data;
    const lastElement = data[data.length - 1];
    const restElements = data.slice(1, data.length - 1);

    setFirstAndLastSearchData([firstElement, lastElement]);
    setSearchDataWithoutFirstAndLast(restElements);
    setAll([firstElement, ...restElements, lastElement]);
  };

  useEffect(() => {
    // This will log the updated state values
    console.log(firstAndLastSearchData);
    console.log(searchDataWithoutFirstAndLast);
    //calculateRoute();
    Setnewarrat();
    Reroute();
  }, [firstAndLastSearchData, searchDataWithoutFirstAndLast]);

  useEffect(() => {
    if (distanceMarker) {
      distanceMarker.setMap(mapRef.current);
    }
  }, [distanceMarker]);

  //function to calculate route
  async function calculateRoute() {
    console.log("calculateRoute start");
    if (
      firstAndLastSearchData[0] == firstAndLastSearchData[1] &&
      searchDataWithoutFirstAndLast[0] == null
    ) {
      console.log("Missing origin or destination");
      return;
    }

    //eslint-disable-next-line  no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: firstAndLastSearchData[0],
      destination: firstAndLastSearchData[1],
      waypoints: searchDataWithoutFirstAndLast.map((location) => ({
        location,
      })),
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    SetdirectionResponse(result);
    console.log("directionResponse", directionResponse);

    const routedetails = result.routes[0].legs.reduce(
      (total, leg) => {
        const legDistance = leg.distance.value;
        const legDuration = leg.duration.value;
        return {
          distance: total.distance + legDistance,
          duration: total.duration + legDuration,
        };
      },
      { distance: 0, duration: 0 }
    );

    setDistance(routedetails.distance);
    setDuration(routedetails.duration);
    console.log(routedetails);

    // Calculate the midpoint between start and end locations
    const startLocation = result.routes[0].legs[0].start_location;
    const endLocation =
      result.routes[0].legs[result.routes[0].legs.length - 1].end_location;
    //eslint-disable-next-line  no-undef
    const midpoint = google.maps.geometry.spherical.interpolate(
      startLocation,
      endLocation,
      0.5
    );
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
    let infoBox;

    if (routedetails.duration < 3600) {
      infoBox = new InfoBox({
        content: `<div style="background-color: #fff; border: 1px solid #999; box-shadow: rgba(0,0,0,0.2) 0px 2px 6px; font-family: Arial,sans-serif; font-size: 12px; line-height: 16px; padding: 5px 10px; min-width: 80px;">
          <span style="font-weight: bold; display: block; margin-bottom: 5px;">${(
            routedetails.distance / 1000
          ).toFixed(1)} km</span>
          <span style="color: #666; font-size: 11px;">${(
            routedetails.duration / 60
          ).toFixed(2)} mins</span>
        </div>`,
        position: midpoint,
        map: mapRef.current,
      });
    } else {
      const h = routedetails.duration / 60 / 60;
      const min = (routedetails.duration / 60) % 60;
      infoBox = new InfoBox({
        content: `<div style="background-color: #fff; border: 1px solid #999; box-shadow: rgba(0,0,0,0.2) 0px 2px 6px; font-family: Arial,sans-serif; font-size: 12px; line-height: 16px; padding: 5px 10px; min-width: 80px;">
          <span style="font-weight: bold; display: block; margin-bottom: 5px;">${(
            routedetails.distance / 1000
          ).toFixed(1)} km</span>
          <span style="color: #666; font-size: 11px;">${h.toFixed()} h ${min.toFixed()}mins</span>
        </div>`,
        position: midpoint,
        map: mapRef.current,
      });
    }

    // Set the InfoBox options
    infoBox.setOptions({
      alignBottom: true,
      //eslint-disable-next-line  no-undef
      pixelOffset: new google.maps.Size(0, 0),
      closeBoxURL: "",
      pane: "floatPane",
      enableEventPropagation: true,
    });

    setDistanceMarker(infoBox);

    console.log("calculateRoute end");
  }

  //function to calculate ReArrange route

  async function CalculateREarangeRoute() {
    console.log("calculateRoute start");

    const middleLocations = newLocations.slice(1, -1);

    // iterate over each element in middleLocations and add it to arrangedmiddlelocations
    middleLocations.map((location) => arrangedmiddlelocations.push(location));

    const size = newLocations.length;

    if (
      newLocations[0] == newLocations[1] &&
      searchDataWithoutFirstAndLast[0] == null
    ) {
      console.log("Missing origin or destination");
      return;
    }
    console.log(newLocations[0]);
    console.log(arrangedmiddlelocations);
    console.log(newLocations[size - 1]);

    //eslint-disable-next-line  no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: newLocations[0],
      destination: newLocations[size - 1],
      waypoints: arrangedmiddlelocations.map((location) => ({
        location,
      })),
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    SetdirectionResponse(result);
    console.log("directionResponse", directionResponse);

    const routedetails = result.routes[0].legs.reduce(
      (total, leg) => {
        const legDistance = leg.distance.value;
        const legDuration = leg.duration.value;
        return {
          distance: total.distance + legDistance,
          duration: total.duration + legDuration,
        };
      },
      { distance: 0, duration: 0 }
    );

    setDistance(routedetails.distance);
    setDuration(routedetails.duration);
    console.log(routedetails);

    // Calculate the midpoint between start and end locations
    const startLocation = result.routes[0].legs[0].start_location;
    const endLocation =
      result.routes[0].legs[result.routes[0].legs.length - 1].end_location;
    //eslint-disable-next-line  no-undef
    const midpoint = google.maps.geometry.spherical.interpolate(
      startLocation,
      endLocation,
      0.5
    );
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
    let infoBox;

    if (routedetails.duration < 3600) {
      infoBox = new InfoBox({
        content: `<div style="background-color: #fff; border: 1px solid #999; box-shadow: rgba(0,0,0,0.2) 0px 2px 6px; font-family: Arial,sans-serif; font-size: 12px; line-height: 16px; padding: 5px 10px; min-width: 80px;">
          <span style="font-weight: bold; display: block; margin-bottom: 5px;">${(
            routedetails.distance / 1000
          ).toFixed(1)} km</span>
          <span style="color: #666; font-size: 11px;">${(
            routedetails.duration / 60
          ).toFixed(2)} mins</span>
        </div>`,
        position: midpoint,
        map: mapRef.current,
      });
    } else {
      const h = routedetails.duration / 60 / 60;
      const min = (routedetails.duration / 60) % 60;
      infoBox = new InfoBox({
        content: `<div style="background-color: #fff; border: 1px solid #999; box-shadow: rgba(0,0,0,0.2) 0px 2px 6px; font-family: Arial,sans-serif; font-size: 12px; line-height: 16px; padding: 5px 10px; min-width: 80px;">
          <span style="font-weight: bold; display: block; margin-bottom: 5px;">${(
            routedetails.distance / 1000
          ).toFixed(1)} km</span>
          <span style="color: #666; font-size: 11px;">${h.toFixed()} h ${min.toFixed()}mins</span>
        </div>`,
        position: midpoint,
        map: mapRef.current,
      });
    }

    // Set the InfoBox options
    infoBox.setOptions({
      alignBottom: true,
      //eslint-disable-next-line  no-undef
      pixelOffset: new google.maps.Size(0, 0),
      closeBoxURL: "",
      pane: "floatPane",
      enableEventPropagation: true,
    });

    setDistanceMarker(infoBox);

    console.log("calculateRoute end");
  }

  //distance calculator

  async function calculateDistance(origin, destination) {
    //eslint-disable-next-line  no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: origin,
      destination: destination,
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const distance = result.routes[0].legs.reduce((total, leg) => {
      return total + leg.distance.value;
    }, 0);

    //console.log(distance);
    return distance;
  }

  //Reroute Functioninggg

  // const Reroute=()=>{
  //       const numofpoints=all.length;
  //       const NumofPonitsToSTARTpoints=Math.ceil(numofpoints/4+1);
  //        for(let i=0;i<numofpoints-1;i++)
  //        {
  //         setNewall([...newall,calculateDistance(all[i],all[i+1])])
  //           //dura ekka arraya ekata location piliwelata watenna ona

  //        }
  // }

  function sortByDistance(points, distances) {
    // Create a new array of objects that combines each point with its corresponding distance
    const combinedArray = points.map((point, index) => ({
      point,
      distance: distances[index],
    }));

    // Sort the new array in ascending order based on the distance property
    combinedArray.sort((a, b) => a.distance - b.distance);

    // Create new arrays for the sorted points and distances
    const sortedPoints = combinedArray.map(({ point }) => point);
    const sortedDistances = combinedArray.map(({ distance }) => distance);

    // Return both sorted arrays as an object
    return { sortedPoints, sortedDistances };
  }

  const Setnewarrat = () => {
    console.log(all);

    const updatedLoc = Array.from(all);
    updatedLoc.forEach((value, index) => {
      newLocations[index] = value;
    });
    //console.log(newLocations);
  };

  const Reroute = async () => {
    const numofpoints = all.length;
    const NumofPonitsToSTARTpoints = Math.ceil(numofpoints / 4 + 1);
    // console.log(numofpoints, loading);
    // if (numofpoints < 2 && loading) {
    //   prompt("gsdfs");
    // }

    for (let j = 0; j < NumofPonitsToSTARTpoints; j++) {
      // const newArray = [...all];
      // newArray[j] = all[j];
      // setNewall(newArray);

      newDistances[j] = 0;

      for (let i = j + 1; i < numofpoints; i++) {
        // const newArray = [...newall];
        // newArray[i] = all[i];
        // setNewall(newArray);
        console.log("start  ", newLocations[j]);
        console.log("end  ", newLocations[i]);
        const distance = await calculateDistance(
          newLocations[j],
          newLocations[i]
        );
        newDistances[i] = distance;
        console.log(newDistances);
        // setDistancedest(newDistances);
        // console.log(distancedest);
      }
      console.log();
      console.log();
      const { sortedPoints, sortedDistances } = sortByDistance(
        newLocations,
        newDistances
      );
      console.log(sortedPoints);

      //backend endpoint

      // Generate a unique key

      // function generateUniqueKey() {
      //   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // }

      // const uniqueKey = generateUniqueKey();

      ///

      setNewall(sortedPoints); // update all with sortedPoints
      const updatedNetances = Array.from(sortedDistances);
      updatedNetances.forEach((value, index) => {
        newDistances[index] = value;
      });
      const updatedlocagain = Array.from(sortedPoints);
      updatedlocagain.forEach((value, index) => {
        newLocations[index] = value;
      });

      console.log("Sorted Points:", newLocations);
      console.log("Sorted Distances:", sortedDistances);
    }
    CalculateREarangeRoute();

    //savec to database
    console.log(currtripid);
    console.log(newLocations);

    axios
      .post(
        `http://localhost:3001/Locations/locations/${currtripid}`,
        newLocations
      )
      .then((response) => {
        console.log("Request successful");
      })
      .catch((error) => {
        console.error("An error occurred", error);
      });

    // const distname=['Kandy, Sri Lanka', 'Gampola, Sri Lanka', 'Gelioya, Sri Lanka']
    // const dist=[0, 24507, 11467]
    // const { sortedPoints, sortedDistances } = sortByDistance(
    //   distname,
    //   dist
    //       );
    //       console.log(sortedPoints);
  };

  //Harshana

  const [mapLocations, setMapLocations] = useState([]);
  const reciveSuggestlocations = (data) => {
    setMapLocations(data);
  };
  const [touristAttractions, setTouristAttractions] = useState([]);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    const locationsWithLatLng = [];

    const geocodeLocation = (locationName) => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: locationName }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            locationsWithLatLng.push({ lat, lng });
            //console.log(locationsWithLatLng);
            resolve();
          } else {
            reject(status);
          }
        });
      });
    };

    const fetchTouristAttractions = async () => {
      try {
        for (const location of mapLocations) {
          await geocodeLocation(location);
        }
      } catch (error) {
        console.log("Error geocoding location:", error);
      }

      if (locationsWithLatLng.length > 0) {
        locationsWithLatLng.forEach((location) => {
          const service = new window.google.maps.places.PlacesService(
            mapRef.current
          );
          const request = {
            location: new window.google.maps.LatLng(location.lat, location.lng),
            radius: 2000,
            type: "tourist_attraction",
          };
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setTouristAttractions((prevAttractions) => [
                ...prevAttractions,
                ...results,
              ]);
            }
          });
        });
      }
    };

    if (isLoaded) {
      fetchTouristAttractions();
    }
  }, [isLoaded, mapLocations]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMapLocations(mapLocations);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const renderMarkers = () => {
    return touristAttractions.map((attraction) => (
      <Marker
        key={attraction.place_id}
        position={{
          lat: attraction.geometry.location.lat(),
          lng: attraction.geometry.location.lng(),
        }}
        icon={{
          url: require("../../../../src/assets/suggested_pin.png"),
          scaledSize: { width: 32, height: 32 },
        }}
        onClick={() => handleMarkerClick(attraction)}
        animation={
          selectedPlace && selectedPlace.place_id === attraction.place_id
            ? window.google.maps.Animation.BOUNCE
            : null
        }
      >
        {selectedPlace && selectedPlace.place_id === attraction.place_id && (
          <InfoWindowF
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <img
                src={selectedPlace.icon}
                alt="Place Icon"
                style={{ width: "20px", height: "20px", margin: "8px" }}
              />
              <span style={{ fontWeight: 500, fontFamily: "poppins" }}>
                {selectedPlace.name}
              </span>
            </div>
          </InfoWindowF>
        )}
      </Marker>
    ));
  };
  //Harshana End

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
        <Header2 />
        <div
          style={{
            marginTop: 0,
            position: "absolute",
            zIndex: 100,
            width: "100%",
          }}
        >
          {gobutton ? (
            <Datafortrip gobuttonhandle={gobuttonhandle} tripid={tripid} />
          ) : (
            <div
              style={{
                marginTop: 70,
                marginLeft: 10,
                position: "absolute",
                zIndex: 100,
              }}
            >
              <Multiplesearch
                Searchplanshow={Searchplanshow}
                Searchplan={Searchplan}
                heading={heading}
                sendlocations={recivelocations}
                locationsstart={locationsstart}
                indexsend={indexsend} // start location
                sendSuggestlocations={reciveSuggestlocations} //Sugest Locations Harshana
                //optimizeroute={calculateRoute}
              />
            </div>
          )}
        </div>
        {/* <div
          style={{
            marginTop: 70,
            marginLeft: 10,
            position: "absolute",
            zIndex: 100,
          }}
        >
          
        </div> */}
      </div>
      <NotificationContainer />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.5}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {renderMarkers()} //suggestLocations
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            // icon={

            // }
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {directionResponse && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: "#0000FF",
                strokeOpacity: 0.7,
                strokeWeight: 4,
              },
            }}
            directions={directionResponse}
          />
        )}
        {selected ? (
          <InfoWindowF position={{ lat: selected.lat, lng: selected.lng }}>
            <div>
              <h2>Spot</h2>
              <p>spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
      {/* {console.log(markers)} */}
      {/* Error handleing */}
      {!isOneEntered && (
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
            Please enter Start location. {console.log("fsDFad")}
          </p>
        </div>
      )}
      {!issecondentered && (
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
            Please enter Destinations. {console.log("fsDFad")}
          </p>
        </div>
      )}
    </>
  );
}
