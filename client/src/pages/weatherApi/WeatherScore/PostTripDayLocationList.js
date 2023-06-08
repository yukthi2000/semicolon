import PostTripDayWeather from "./PostTripDayWeather";

export default function PostTripDayLocationList(props){
    const locationList = props.locationList ;
    
    const weatherScore = locationList.map((item) => (
        <PostTripDayWeather
          key={item} //
          currentCity={item}
          tripID={props.tripID}
          tripDate={props.tripDate}
        />
      ));
    
      return <div>{weatherScore}</div>;

    }