import React from "react";
import { useRef, useState } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

const Searchbox = ({ place, currLocation, index }) => {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);
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

  const sendLocations = () => {
    const inputValue = originRef.current.value.trim();

    if (inputValue === "") {
      setError("Please enter a location.");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
      currLocation(inputValue);
    }
  };
  return (
    <div>
      <div>
        {console.log(index)}
        <Autocomplete restrictions={restrictions} options={options}>
          {index === 1 ? (
            <input
              type="text"
              placeholder={place}
              ref={originRef}
              style={{
                padding: "17px",
                fontSize: "18px",
                fontFamily: "Courier New",
                width: "475px",
                borderRadius: "4px",
                border: isValid ? "" : "2px solid red",
              }}
              onBlur={sendLocations}
              readOnly
            />
          ) : (
            <input
              type="text"
              placeholder={place}
              ref={originRef}
              style={{
                padding: "17px",
                fontSize: "18px",
                fontFamily: "Courier New",
                width: "475px",
                borderRadius: "4px",
                border: isValid ? "" : "2px solid red",
              }}
              onBlur={sendLocations}
            />
          )}
        </Autocomplete>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Searchbox;
