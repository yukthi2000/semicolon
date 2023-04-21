import React from "react";
import { useRef } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import {Box} from "@mui/material";

const Searchbox = ({ location, currLocation }) => {
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
    if (originRef.current.value !== "") {
      currLocation(originRef.current.value);
    }
  };
  return (
    <Box>
      <Box className="search_container">
        <Autocomplete restrictions={restrictions} options={options}>
          <TextField
            id="outlined-search"
            type="search"
            placeholder={location}
            // ref={originRef}
            inputRef={originRef}
            inputProps={{ style: { fontSize: 17, margin: 0,padding:11 } }}
            onBlurCapture={sendLocations}
            sx={{
              fontFamily: "Courier New",
              width: "250px",
              border: "2px solid white",
            }}
            // onBlur={sendLocations}
          />
        </Autocomplete>
      </Box>
    </Box>
  );
};

export default Searchbox;
