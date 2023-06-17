import React, { useEffect, useState } from 'react';

const TouristAttractions = ({ locations, map }) => {
  const [infoWindows, setInfoWindows] = useState([]);

  const getInfoWindowContent = place => {
    const iconUrl = place.icon;
    const placeName = place.name;
    const iconHtml = `<img src="${iconUrl}" alt="${placeName}" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 5px;" />`;
    const placeNameHtml = `<span style="font-family: 'Poppins', sans-serif; font-weight: 500;">${placeName}</span>`;
    return `${iconHtml}${placeNameHtml}`;
  };

  useEffect(() => {
    if (locations.length === 0 || !map) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    const placesService = new window.google.maps.places.PlacesService(map);

    const fetchTouristAttractions = async () => {
      const newInfoWindows = [];

      for (const locationName of locations) {
        const geocodeResult = await new Promise((resolve, reject) => {
          geocoder.geocode({ address: locationName }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location);
            } else {
              reject(status);
            }
          });
        });

        const request = {
          location: geocodeResult,
          radius: 2000,
          type: ['tourist_attraction'],
        };

        const response = await new Promise((resolve, reject) => {
          placesService.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(results);
            } else {
              reject(status);
            }
          });
        });

        for (const place of response) {
          const infoWindowContent = getInfoWindowContent(place);

          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent,
          });

          const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          newInfoWindows.push(infoWindow);
        }
      }

      setInfoWindows(newInfoWindows);
    };

    fetchTouristAttractions().catch(error => {
      console.error('Error fetching tourist attractions:', error);
    });
  }, [locations, map]);

  useEffect(() => {
    infoWindows.forEach(infoWindow => {
      window.google.maps.event.addListener(infoWindow, 'closeclick', () => {
        infoWindow.close();
      });
    });
  }, [infoWindows]);

  return null;
};


export default TouristAttractions;
