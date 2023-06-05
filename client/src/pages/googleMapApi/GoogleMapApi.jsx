import Header2 from "../../componets/Header2";
import React from "react";
import Map from "./Map"
import { HomeContext } from "../../Context/HomeContext";
import { useContext } from "react";

// import Searchbar from "./Searchbar";



export default function GoogleMapApi() {
  const [curr, setCurr] = React.useState("");
  const{startloc}=useContext(HomeContext)
  return (
    <div>
      <Header2 />
      <HomeContext.Provider value={{ curr: startloc }}>
      <Map />
      </HomeContext.Provider >
    </div>
  )
}
