import loading from "../../assets/loading (1).gif";
import error from "../../assets/error.gif";
import * as React from "react";
import Searchbar from "./Searchbar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useState } from "react";
import "./Searc.css";
import Multiplesearch from "./Multiplesearch";
import { PropTypes } from "prop-types";
import Header2 from "../../componets/Header2";
import Sidepan from "./Sidepan";
import { useEffect } from "react";

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
import { Button } from "@mui/material";
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";
const heading = "kandy";
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

export default function Map(latlng, props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1tZY8x6OG7mt7a2iovZTDIj8SDV6sL8s",
    libraries,
  });
  const [markers, Setmarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [Searchplan, setSearchplan] = useState(false);
  const [Searchplan2, setSearchplan2] = useState(props.Searchplan);
  const [search, setSearch] = useState(false);
  const [mylat, setMylat] = useState(0);
  const [mylng, setMylng] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylat(position.coords.latitude);
      setMylng(position.coords.longitude);
      Setmarkers((current) => [
        ...current,
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          time: new Date(),
        },
      ]);
    });
  }, [1]);

  const handlesearch = () => {
    setSearch(!search);
  };

  // const onmarkk = (data) => {
  //   console.log("dadfa");
  //   Setmarkers(data);
  // };
  const Searchplanshow = () => {
    setSearchplan(!Searchplan);
  };

  // const onMapClick = React.useCallback(
  //   (event) => {
  //     Setmarkers((current) => [
  //       ...current,
  //       {
  //         lat: event.latLng.lat(),
  //         lng: event.latLng.lng(),
  //         time: new Date(),
  //       },
  //     ]);
  //   },

  // );

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={error} />
      </div>
    );
  if (!isLoaded)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={loading} />
      </div>
    );

  return (
    <>
      <div>
        <Header2 />
        <div
          style={{
            marginTop: 70,
            marginLeft: 10,
            position: "absolute",
            zIndex: 100,
          }}
        >
          {search ? (
            Searchplan ? (
              <Multiplesearch
                Searchplanshow={Searchplanshow}
                Searchplan={Searchplan}
                heading={heading}
              />
            ) : (
              <div className="searchbar">
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  <IconButton sx={{ p: "10px" }} aria-label="menu">
                    <MenuIcon onClick={Searchplanshow} />
                  </IconButton>

                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton
                    color="primary"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                  >
                    <DirectionsIcon />
                  </IconButton>
                </Paper>
              </div>
            )
          ) : (
            <Sidepan handlesearch={handlesearch} />
          )}
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.5}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            icon={{
              scaledSize: new window.google.maps.Size(10, 10),
            }}
          >
            <div>fa </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>

      {/* {console.log(markers)} */}
    </>
  );
}

function Search({ panTo, prop }) {
  const mark = (e) => {
    // const newmarkers = [...prop.markers, { lat: 32, lng: 43, time: 43 }];
    //console.log(e);
    // prop.Setmarkers(newmarkers);
    prop.onmark(e);
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 7.84774, lng: () => 80.7003 },
      radius: 200 * 1000,
    },
  });
  return (
    <Combobox
      className="search"
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
          // console.log(lat, lng); //show lat lng of searched address
          mark({ lat, lng, time: new Date() });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <ComboboxInput
        className="combobox-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter a location"
      />
      <ComboboxPopover>
        <ComboboxList className="combobox-list">
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );

  Search.propTypes = {
    onmark: PropTypes.func,
  };
}

export { Search };
