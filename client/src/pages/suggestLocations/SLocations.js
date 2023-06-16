import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const libraries = ["places"];

const SLocations = () => {
  const [mapLocations, setMapLocations] = useState([
    "Kandy, Sri Lanka",
    "Matale, Sri Lanka",
  ]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCjTfIEci5TjcUCYMifDVtiC6nt7tFRqko",
    libraries,
  });

  const [touristAttractions, setTouristAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const mapRef = useRef(null);
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
  };

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    const locationsWithLatLng = [];

    const geocodeLocation = (locationName) => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: locationName }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            locationsWithLatLng.push({ lat, lng });
            resolve();
          } else {
            reject(status);
          }
        });
      });
    };

    const fetchTouristAttractions = async () => {
      try {
        for (const location of mapLocations) {
          await geocodeLocation(location);
        }
      } catch (error) {
        console.log("Error geocoding location:", error);
      }

      if (locationsWithLatLng.length > 0) {
        locationsWithLatLng.forEach((location) => {
          const service = new window.google.maps.places.PlacesService(mapRef.current);
          const request = {
            location: new window.google.maps.LatLng(location.lat, location.lng),
            radius: 2000,
            type: "tourist_attraction",
          };
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setTouristAttractions((prevAttractions) => [...prevAttractions, ...results]);
            }
          });
        });
      }
    };

    if (isLoaded) {
      fetchTouristAttractions();
    }
  }, [isLoaded, mapLocations]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMapLocations(["Kandy, Sri Lanka", "Matale, Sri Lanka"]);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };
  const renderMarkers = () => {
  return touristAttractions.map((attraction) => (
    <Marker
      key={attraction.place_id}
      position={{
        lat: attraction.geometry.location.lat(),
        lng: attraction.geometry.location.lng(),
      }}
      icon={{
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      }}
      onClick={() => handleMarkerClick(attraction)}
    >
      {selectedPlace && selectedPlace.place_id === attraction.place_id && (
        <InfoWindow
          position={{
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng(),
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>{selectedPlace.name}</div>
        </InfoWindow>
      )}
    </Marker>
  ));
};

  
  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.5}
        center={ {
          lat: 7.84774,
          lng: 80.7003,
        }}
        options={options}
        onLoad={(map) => (mapRef.current = map)}
      >
        {renderMarkers()}
      </GoogleMap>
    </div>
  );
};

export default SLocations;
