import React, { useEffect, useState } from 'react';

export default function NameToLatLng({ locations }) {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
      const fetchCoordinates = async () => {
        const apiKey = 'AIzaSyCjTfIEci5TjcUCYMifDVtiC6nt7tFRqko';
        const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
  
        const requests = locations.map(async (location) => {
          const encodedLocation = encodeURIComponent(location);
          const url = `${geocodeUrl}address=${encodedLocation}&key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
  
          if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { name: location, lat, lng };
          } else {
            return null;
          }
        });
  
        const results = await Promise.all(requests);
        setCoordinates(results.filter((result) => result !== null));
      };
  
      fetchCoordinates();
    }, [locations]);
  
    return coordinates;
}
