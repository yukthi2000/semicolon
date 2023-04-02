import React from "react";
import loading from "../../assets/loading (1).gif";
import error from "../../assets/error.gif";
import "./Searchome.css";
import Searchbox from "./Searchbox";

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

export default function Search({ placeholder }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1tZY8x6OG7mt7a2iovZTDIj8SDV6sL8s",
    libraries,
  });
  // const [markers, Setmarkers] = React.useState([]);
  // const [selected, setSelected] = React.useState(null);

  // const [locations,setLocations]=React.useState([]);

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
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading";

  return (
    <>
      <Searchbox place={placeholder} />
    </>
  );
}
