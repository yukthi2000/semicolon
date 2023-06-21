import { useEffect, useState } from "react";
import NameToLatLng from "./NameToLatLng";
import PostTripDayWeather from "./PostTripDayWeather";
import CalculateWeatherScores from "./CalculateWeatherScores";

export default function PostTripDayLocationList(props) {
  const tripID = props.tripID;
  const locationList = props.locationList;
  const LocationCoordinateList = NameToLatLng({ locations: locationList });
  // const [runCalculateWeatherScores, setRunCalculateWeatherScores] = useState(false);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setRunCalculateWeatherScores(true);
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, [LocationCoordinateList]);

  const SaveWeather = LocationCoordinateList.map((item, index) => {
    const isLastItem = index === LocationCoordinateList.length - 1;
    console.log("list last",isLastItem);

    return (
      <PostTripDayWeather
        key={item.name}
        currentCity={item.name}
        lat={item.lat}
        lng={item.lng}
        tripID={tripID}
        tripDate={props.tripDate}
        isLastItem={isLastItem}
        locationList={locationList}
      />
    );
  });

  return (
    <div>
      {SaveWeather}
      {/* {runCalculateWeatherScores && (
        <CalculateWeatherScores tripID={props.tripID} locationList={locationList} />
      )} */}
    </div>
  );
}
