import React, { useEffect } from "react";
import Map from "../googleMapApi/Map"; // Import the Map component

function TestMark(props) {
  useEffect(() => {
    // Access the lat and lng from the props
    const { lat, lng } = props;
    // Log the lat and lng values
    console.log(lat, lng);
  }, [props]);

  return (
    <div>
      <h1>Tourist Attractions</h1>
      {/* Render the Map component and pass the lat and lng as props */}
      <Map lat={props.lat} lng={props.lng} />
    </div>
  );
}

export default TestMark;