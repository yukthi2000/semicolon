import React, { useContext, useState } from "react";

import "./Searchome.css";
import Searchbox from "./searchBox";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { HomeContext } from "../../Context/HomeContext";

// import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const libraries = ["places"];

export default function Search({ placeholder, currlocation2 }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCjTfIEci5TjcUCYMifDVtiC6nt7tFRqko",
    libraries,
  });

  const {startloc}=useContext(HomeContext);

  const curr = (data) => {
    currlocation2(data);
    startloc=data;
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
