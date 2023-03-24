import React from "react";
import homeBg from "../../assets/homeBG.jpg"
import "./Home.css"
import Button from "@mui/material/Button";
import Search from "./Search";
import { Link } from "react-router-dom";

import Header from "../../componets/Header";
import Register from "../login/Register";
import Header2 from "../../componets/Header2";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { height, width } from "@mui/system";



const Home = () => {
  return (
    <div>
    <div>
      <div>
        <Header2 />
      </div>
      <div  className="Backgroung-img" >
            <img src={homeBg} alt="" height="667px" width="100%" position="fixed"/>
            <div className="content">
                <p>
                <div className="w1">LIVE YOUR</div>
                <div className="w2">ADVENTURE</div>
                <div className="p">Don't wait until tomorrow, discover your<br/>
                adventure now and feel the sensation of<br/> closeness 
                to nature around you</div>
                </p>
            </div>
            <div className="box"/>
            <div>
            <div className="destination1" ><Search placeholder="Start Location" /> </div>
            <div className="destination2"><Search placeholder="End Location" /> </div>
            </div>
           
            <Button href="/googleMapApi" sx={{marginLeft:"auto", color:"white", backgroundColor:"#E86E18", top:"-28.5vh", left:"87.5vh", borderRadius:"27px"}}>Go</Button>
           </div>
            <div>
                <p className="p2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio neque veniam, earum, sed animi nesciunt architecto
                    voluptate adipisci sunt, ut consectetur beatae eius inventore 
                    quidem dolor error aperiam delectus. Odio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio neque veniam, earum, sed animi nesciunt architecto
                    voluptate adipisci sunt, ut consectetur beatae eius inventore 
                    quidem dolor error aperiam delectus. Odio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio neque veniam, earum, sed animi nesciunt architecto
                    voluptate adipisci sunt, ut consectetur beatae eius inventore 
                    quidem dolor error aperiam delectus. Odio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio neque veniam, earum, sed animi nesciunt architecto
                    voluptate adipisci sunt, ut consectetur beatae eius inventore 
                    quidem dolor error aperiam delectus. Odio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio neque veniam, earum, sed animi nesciunt architecto
                    voluptate adipisci sunt, ut consectetur beatae eius inventore 
                    quidem dolor error aperiam delectus. Odio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio neque veniam, earum, sed animi nesciunt architecto
                    voluptate adipisci sunt, ut consectetur beatae eius inventore 
                    quidem dolor error aperiam delectus. Odio.
                </p>
                <div ></div>
                <div><Link to={"/inputdata"}> <Button>fadf</Button></Link> </div>
            </div>
        </div>
        
      </div>
    
  )
}

export default Home;