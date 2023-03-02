import React from "react";
import homeBg from "../../assets/homeBG.jpg"
import "./Home.css"
import Button from "@mui/material/Button";



const Home = () => {
    return(
        <div>
        <div  className="Backgroung-img">
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
            <div><input  className="destination1" placeholder="Where are you starting?"/></div>
            <div><input className="destination2" placeholder="Where are you going?"/></div>
            <Button sx={{marginLeft:"auto", color:"white", backgroundColor:"#E86E18", top:"-30.5vh", left:"87.5vh", borderRadius:"27px"}}>Go</Button>
            </div>
        </div>
    )
}

export default Home;