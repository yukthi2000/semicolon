import React from "react";
import loading from "../../assets/loading (1).gif";
import error from "../../assets/error.gif"



import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { formatRelative } from "data-fns";

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

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAPKEY,
  });
  if (loadError) return <div style={{display: "flex",justifyContent:"center",alignItems:"center",height:"100vh"}} ><img src={error}></img> </div>;
  if (!isLoaded) return <div style={{display: "flex",justifyContent:"center",alignItems:"center",height:"100vh"}} ><img src={loading}></img> </div>;

  return (
    <>
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.75}
        center={center}
        options={options}
      ></GoogleMap>
    </>
  );
}
