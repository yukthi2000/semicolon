import React, { useRef } from "react";
import loading from "../../assets/loading (1).gif";
import error from "../../assets/error.gif";

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
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";

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

export default function Search({ placeholder, setLocations }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1tZY8x6OG7mt7a2iovZTDIj8SDV6sL8s",
    libraries: ["places"], //enable googlemap places api
  });

  const [directionResponse, SetdirectionResponse] = React.useState(null);
  const [distance, setDistance] = React.useState("");
  const [duration, setduration] = React.useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    //eslint-disable-next-line  no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      //eslint-disable-next-line  no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    SetdirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance.text);
  }

  function CleareRoute() {
    SetdirectionResponse(null);
    setDistance("");
    setduration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }
  // const [markers, Setmarkers] = React.useState([]);
  // const [selected, setSelected] = React.useState(null);

  // const [locations,setLocations]=React.useState([]);

  // const setloc = (data) => {
  //   setLocations(data);
  // };
  // const onMapClick = React.useCallback((event) => {
  //   Setmarkers((current) => [
  //     ...current,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);
  // const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);

  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "loading";

  return (
    <>
      <Autocomplete>
        <input type={"text"} placeholder="start" ref={originRef}></input>
      </Autocomplete>

      <Autocomplete>
        <input
          type={"text"}
          placeholder="destination"
          ref={destinationRef}
        ></input>
      </Autocomplete>

      <button onClick={calculateRoute}>set route</button>
      <button onClick={CleareRoute}>delete routr</button>
    </>
  );
}
