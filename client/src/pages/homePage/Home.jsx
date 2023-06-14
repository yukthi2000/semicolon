import React from "react";
import home from "../../assets/home.jpg";
import tourist from "../../assets/tourist.png";
import Saly from "../../assets/Saly-3.png";
import carousel1 from "../../assets/AboutUs/1.jpg";
import carousel2 from "../../assets/AboutUs/2.jpg";
import carousel3 from "../../assets/AboutUs/3.jpg";
import background from "../../assets/About us.jpg";
import "./Home.css";
import Button from "@mui/material/Button";
import Search from "./Search";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../componets/Header";
import Register from "../login/Register";
import Header2 from "../../componets/Header2";
import { useState } from "react";
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
import { HomeContext } from "../../Context/HomeContext";

const Home = () => {
  const [startlocation, setstartLocation] = React.useState([]);
  //const [endlocation, setendLocation] = React.useState([]);

  const sendlocations = () => {
    axios
      .post("http://localhost:3000/googleMapApi", {
        startlocation: startlocation,
        //endlocation: endlocation,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const setLocationstart = (data) => {
    setstartLocation(data);
  };
  // const setLocationend = (data) => {
  //   setendLocation(data);
  // };

  const calculateRoute = () => {
    //to make routr
    // const directionservice = new google.maps.DirectionsService(); //call to google map direction service as directionservice
    // const result=await directionservice.route({
    //   origin:
    // })
  };

  const [status, setStatus] = useState("Send");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending..");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      let response = await fetch("http://localhost:3001/contactUs/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });

      setStatus("Submit");

      if (!response.ok) {
        throw new Error("Error occurred during request");
      }

      let result = await response.json();
      alert(result.status);
    } catch (error) {
      console.error(error);
      alert("An error occurred during the request.");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    const { name, email, message } = e.target.form;
    name.value = "";
    email.value = "";
    message.value = "";
  };

  return (
    <div>
      {React.useEffect(() => {
        console.log(startlocation);
        //console.log(endlocation);
      })}
      <div>
        <div>{/* <Header2 /> */}</div>
        <div className="Backgroung-img">
          <img
            src={home}
            alt=""
            height="750px"
            width="100%"
            position="relative"
          />

          <div className="tourist">
            <img
              src={Saly}
              alt=""
              height="450px"
              width="400px"
              position="abosolute"
            />
          </div>

          <div className="blob">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              width="100%"
              id="blobSvg"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "rgb(219, 99, 0)" }} />
                  <stop
                    offset="100%"
                    style={{ stopColor: "rgb(239, 201, 97)" }}
                  />
                </linearGradient>{" "}
              </defs>
              <path id="blob" fill="url(#gradient)">
                <animate
                  attributeName="d"
                  dur="10000ms"
                  repeatCount="indefinite"
                  values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"
                ></animate>
              </path>
            </svg>
          </div>

          <div className="content">
            <p>
              <div className="w1">LIVE YOUR</div>
              <div className="w2">ADVENTURE</div>
              <div className="p">
                Don't wait until tomorrow, discover your
                <br />
                adventure now and feel the sensation of
                <br /> closeness to nature around you
              </div>
            </p>
          </div>
          <div className="box" />
          <div>
            <div className="destination1">
              <Search
                placeholder="Enter Start Location........................"
                currlocation2={setLocationstart}
              />
            </div>
            {/* <div className="destination2">
              <Search placeholder="End Location" currlocation2={setLocationend} />
            </div> */}
          </div>

          <Button
            href="/googleMapApi"
            sx={{
              marginLeft: "auto",
              color: "white",
              backgroundColor: "#EF7E2A",
              top: "-28vh",
              left: "89vh",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "white",
                color: "#EF7E2A",
              },
            }}
            onClick={sendlocations}
          >
            Go
          </Button>
        </div>
        <div>
          <p className="p2"></p>
          <div></div>
        </div>
      </div>
      <div className="gallery">
        <Link to="/contactUs">
          <h4>Contact us</h4>
        </Link>
        <Link to="/aboutUs">
          <h4>About us</h4>
        </Link>
      </div>
      <div className="place">
        {" "}
        <div className="aboutUs mx-auto">
          <div className="aboutus_image"></div>
          <div className="about_us_text">
            <div className="graph_1 text-center">
              <h2>
                <center className="">About Us</center>
              </h2>
              <div>
                <h3>
                  <br />
                  Welcome to JourneyJive!
                </h3>
              </div>
              <div>
                <h5>
                  <p >
                    your passport to seamless travel planning and unforgettable
                    adventures. Our mission is to inspire and empower travelers
                    like you to explore the world and create lifelong memories.
                    JourneyJive is your one-stop destination for everything
                    travel-related. Discover exciting destinations, from hidden
                    gems to popular hotspots, through our comprehensive location
                    search. Gain valuable insights from fellow travelers by
                    reading and writing reviews, helping you make informed
                    decisions about your next journey. Capture the essence of
                    your experiences with our image upload feature, and be
                    inspired by the stunning visuals shared by our vibrant
                    travel community.
                  </p>

                  <p>
                    Let us optimize your itinerary with our intelligent route
                    planning, ensuring you make the most of your time and visit
                    the must-see attractions. Stay ahead of the weather with our
                    real-time forecasts, providing you with the information you
                    need to pack appropriately and plan your activities
                    accordingly. And the best part? Save all your trip details
                    and itineraries in one place, easily accessible whenever you
                    need them. JourneyJive is here to simplify your travel
                    planning process, leaving you free to focus on the joy of
                    exploration. So embark on your next adventure with
                    confidence and let JourneyJive be your trusted companion on
                    this extraordinary journey.
                  </p>
                </h5>
              </div>
              {/* <div>
                <h4>
                  Adventure awaits. Let JourneyJive be your compass and turn
                  your travel dreams into cherished memories.
                </h4>
              </div> */}
            </div>
          </div>

          {/* <div className="background">
            <img src={background} alt="" className="background_image" />
          </div> */}

          {/* 
          <div id="carouselExampleIndicators" class="carousel slide carousel1 " data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src={carousel1} alt="First slide" ></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={carousel2} alt="Second slide"></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={carousel3} alt="Third slide"></img>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> */}
        </div>



        <div className="Contactus">
        <div>
        <h2>
          <center>Contact Us</center>
        </h2>
      </div>

      <div className="cUsContent">
        <div className="contPara">
          <div>
            <h4>
              <p>
                <br />
                We value your connection and are eager to hear from you.
                JourneyJive, your trusted travel companion, is always just a
                message away. Whether you have questions, feedback, or simply
                want to share your travel stories, we're here to listen and
                assist. Our team is dedicated to providing exceptional support
                and ensuring that your journey with us is nothing short of
                extraordinary. Get in touch with us through the contact
                information provided below, and let's embark on a conversation
                that brings your travel aspirations to life. Together, let's
                create meaningful memories and explore the world with
                JourneyJive.
              </p>
            </h4>
          </div>
          <div>
            <h4>Happy travels!</h4>
          </div>
        </div>
        <div className="contForm">
          <div className="contact-us container-fluid">
            {/* <div className='paragraph'>
        <div className='header'>Get in touch..<br/></div>
        <div className='para'>
        Fill out this form and we will get back to you shortly<br/><br/>
        Address:<br/>
        Students’ Union,<br/>
        Faculty of Information Technology,<br/>
        University of Moratuwa<br/><br/>
        Telephone:<br/>
        +94775467896<br/><br/>
        Email:<br/>
        abd@gmail.com<br/>
        </div>
      </div> */}
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <input
                      className="input"
                      type="text"
                      id="name"
                      required
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      type="email"
                      id="email"
                      required
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <textarea
                      className="message"
                      id="message"
                      required
                      placeholder="Message"
                    />
                  </div>
                  <div>
                    <button
                      type="reset"
                      className="CUform-button"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                    <button type="submit" className="CUform-button1">
                      {status}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
