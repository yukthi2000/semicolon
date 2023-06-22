import React, { useEffect, useState } from "react";
import { InfoBox } from "@react-google-maps/infobox";
import error from "../../../assets/error.gif";

import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  InfoWindowF,
} from "@react-google-maps/api";

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

const ViewTripsonMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCjTfIEci5TjcUCYMifDVtiC6nt7tFRqko",
    libraries,
  });
  const [locationss, setlocationss] = React.useState([]);
  const [firstAndLastSearchData, setFirstAndLastSearchData] = useState([]);
  const [searchDataWithoutFirstAndLast, setSearchDataWithoutFirstAndLast] =
    useState([]);
  const [all, setAll] = useState([]);
  const [directionResponse, SetdirectionResponse] = React.useState(null);
  const [distanceMarker, setDistanceMarker] = useState(null);
  const [distance, setDistance] = React.useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setloading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locations = JSON.parse(
    decodeURIComponent(searchParams.get("locations"))
  );

  useEffect(() => {
  
  }, []);

  const start = () =>{
    const locationNames = locations.map((location) => location.name);
    setlocationss(locationNames);
    console.log(locationNames);
    const [firstElement, ...restElement] = locationNames;
    const lastElement = locationNames[locationNames.length - 1];
    const restElements = locationNames.slice(1, locationNames.length - 1);

    setFirstAndLastSearchData([firstElement, lastElement]);
    setSearchDataWithoutFirstAndLast(restElements);
    setAll([firstElement, ...restElements, lastElement]);
  }

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

  //   console.log(locationss);

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
    if (!window.google || !window.google.maps || !window.google.maps.DirectionsService) {
        console.log("Google Maps API not loaded");
        return;
      }

    console.log(firstAndLastSearchData);
    console.log(searchDataWithoutFirstAndLast);

    //eslint-disable-next-line  no-undef
    const directionService = new window.google.maps.DirectionsService();
    const result = await directionService.route({
      origin: firstAndLastSearchData[0],
      destination: firstAndLastSearchData[1],
      waypoints: searchDataWithoutFirstAndLast.map((location) => ({
        location,
      })),
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log("directionResponse", result);
    SetdirectionResponse(result);
    console.log("directionResponse", result);

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

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    setloading(!loading);
    start();
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
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.5}
        center={center}
        options={options}
        //onClick={onMapClick}
        onLoad={onMapLoad}
      >
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
      </GoogleMap>
    </div>
  );
};

export default ViewTripsonMap;
