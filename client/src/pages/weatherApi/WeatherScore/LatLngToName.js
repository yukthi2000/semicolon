import React, { useEffect, useState } from 'react';

const LatLngToName = ({ lat, lng }) => {
    const [city, setCity] = useState('');

    useEffect(() => {
      const fetchCity = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCjTfIEci5TjcUCYMifDVtiC6nt7tFRqko`
          );
  
          if (response.ok) {
            const data = await response.json();
            const results = data.results;
            if (results.length > 0) {
              const addressComponents = results[0].address_components;
              const cityComponent = addressComponents.find(component =>
                component.types.includes('locality')
              );
  
              if (cityComponent) {
                const city = cityComponent.long_name;
                setCity(city);
              }
            }
          } else {
            throw new Error('Error fetching city');
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchCity();
    }, [lat, lng]);
  
    return <div>{city}</div>;

};

export default LatLngToName;
