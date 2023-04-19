import React from "react";
import { useRef } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

const Searchbox = ({ place ,currLocation}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1tZY8x6OG7mt7a2iovZTDIj8SDV6sL8s",
    libraries: ["places"], //enable googlemap places api
  });
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  //   /** @type React.MutableRefObject<HTMLInputElement> */
  //   const destinationRef = useRef();
  //eslint-disable-next-line  no-undef

  const restrictions = {
    country: "lk", //restrict search locations into srilanka
  };

  const options = {
    strictBounds: true,
  };

  const sendLocations = () => {currLocation(originRef.current.value)};
  return (
    <div>
      <div>
        <Autocomplete restrictions={restrictions} options={options}>
          <input
            type={"text"}
            placeholder={place}
            ref={originRef}
            style={{
              padding: "17px",
              fontSize: "18px",
              fontFamily: "Courier New",
              width: "475px",
              borderRadius: "4px",
            }}
            onBlur={sendLocations}
          ></input>
        </Autocomplete>
      </div>
      
    </div>
  );
};

export default Searchbox;
