import React, { useState } from "react";

import "./Searchome.css";
import Searchbox from "./Searchbox";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const libraries = ["places"];

export default function Search({ placeholder, currlocation2 }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1tZY8x6OG7mt7a2iovZTDIj8SDV6sL8s",
    libraries,
  });
  

  const curr = (data) => {
    
    currlocation2(data);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading";

  return (
    <>
      <Searchbox place={placeholder} currLocation={curr} />
      {/* {console.log(currlocation2)} */}
    </>
  );
}
