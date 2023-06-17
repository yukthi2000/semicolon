import React, { useEffect, useRef, useState } from 'react';

const MapForSuggest = ({ setMap }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapOptions = {
      center: { lat: 7.467465, lng: 80.623416  },
      zoom: 8,
    };

    const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(mapInstance);
  }, [setMap]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
};

export default MapForSuggest;

