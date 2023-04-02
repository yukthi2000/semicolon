import React from "react";
import { useRef } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

const Searchbox = () => {
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
  return (
    <div>
      <div className="search_container">
        <Autocomplete restrictions={restrictions} options={options}>
          <input
            type={"text"}
            placeholder="Location"
            ref={originRef}
            style={{
              padding: "15px",
              fontSize: "16px",
              fontFamily: "Courier New",
              width: "250px",
              border: "2px solid white",
              height: "50px",
            }}
          ></input>
        </Autocomplete>
        
      </div>
    </div>
  );
};

export default Searchbox;
