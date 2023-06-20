import { useEffect, useState } from "react";
import NameToLatLng from "./NameToLatLng";
import PostTripDayWeather from "./PostTripDayWeather";
import CalculateWeatherScores from "./CalculateWeatherScores";

export default function PostTripDayLocationList(props) {
  const tripID = props.tripID;
  const locationList = props.locationList;
  const LocationCoordinateList = NameToLatLng({ locations: locationList });
  const arrayLength = locationList.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === arrayLength - 1) {
      CalculateWeatherScores({ tripID, locationList });
    }
  }, [currentIndex, arrayLength, tripID, locationList]);

  const SaveWeather = LocationCoordinateList.map((item, index) => {
    return (
      <PostTripDayWeather
        key={item.name}
        currentCity={item.name}
        lat={item.lat}
        lng={item.lng}
        tripID={tripID}
        tripDate={props.tripDate}
      />
    );
  });

  useEffect(() => {
    if (currentIndex < arrayLength) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  return <div>{SaveWeather}</div>;
}
