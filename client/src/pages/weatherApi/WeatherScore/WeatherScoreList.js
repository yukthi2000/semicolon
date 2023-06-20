import React from "react";
import WeatherScore from "./WeatherScore";

export default function WeatherScoreList(props) {
  const { locationList, tripID } = props;

  const weatherScoreMap = locationList.map((item) => (
    <WeatherScore
    key={item.location}
    location={item} // Pass the entire item object as the location prop
    tripID={tripID}
    />
  ));

  console.log(weatherScoreMap);

  return <div>{weatherScoreMap}</div>;
}
