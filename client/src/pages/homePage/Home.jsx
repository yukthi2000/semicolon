import React from "react";
import home from "../../assets/home.jpg";
import Saly from "../../assets/Saly-3.png";
import Saly19 from "../../assets/Saly-19.png";
import "./Home.css";
import Button from "@mui/material/Button";
import Search from "./Search";
import axios from "axios";
import { useState, useEffect } from "react";
import weatherForecast from "../../assets/weatherForecast.jpg";
import routeOptimize from "../../assets/routeOptimize.png";
import Kabaragala from "../../assets/Kabaragala.jpg";
import dunhinda from "../../assets/dunhinda.jpg";
import pasikuda from "../../assets/pasikuda.jpg";
import sigiriya from "../../assets/sigiriya.jpg";
import airBallon from "../../assets/airBallon.png";
import travelPack from "../../assets/travelPack.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useContext } from "react";

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

import ContactUs from "../ContactUs/ContactUs";

const Home = () => {
  const [startlocation, setstartLocation] = React.useState([]);
  const [isLocationEntered, setIsLocationEntered] = React.useState(true);
  const sendlocations = () => {
    if (authState.userType === "") {
      navigate("/mapp");
    }
    if (startlocation.length > 0) {
      axios
        .post("http://localhost:3000/googleMapApi", {
          startlocation: startlocation,
        })
        .then((response) => {
          console.log(response);
        });
    } else {
      setIsLocationEntered(false);
    }
  };

  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (authState.userType === "") {
      // navigate("/subscription");
      setIsLocationEntered(true);
    }
  }, []);

  const setLocationstart = (data) => {
    setstartLocation(data);
    setIsLocationEntered(true);
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

  return (
    <div className="home-page">
      {React.useEffect(() => {
        console.log(startlocation);
        //console.log(endlocation);
      })}

      <div className="div-section">
        <div className="Backgroung-img">
          <img
            src={home}
            alt=""
            height="750px"
            width="1519px"
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
            href={
              startlocation.length > 0
                ? `/googleMapApi?startlocation=${startlocation}`
                : undefined
            }
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
          {!isLocationEntered && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "9999",
                width: "300px",
                height: "50px",

                backgroundColor: "#f8d7da",
                padding: "10px",
                borderRadius: "6px",
                textAlign: "center",
                animationName: "highlight",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
                boxShadow: "0 0 0 2px #f8d7da",
              }}
            >
              <p
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  zIndex: 9999,
                }}
              >
                Please enter a location. {console.log("fsDFad")}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="div-section">
        <div className="Features">
          <div className="Features1">
            {" "}
            <img
              src={Saly19}
              alt=""
              height="450px"
              width="500px"
              position="abosolute"
            />
          </div>
          <div className="Features2">
            FEATURES TO REPLACE ALL YOUR OTHER TOOLS
            <div className="cards">
              <div className="card">
                <section class="articles">
                  <article>
                    <div class="article-wrapper">
                      <figure className="figure">
                        <img
                          src={routeOptimize}
                          alt=""
                          width="170px"
                          height="100px"
                        />
                      </figure>
                      <div class="article-body">
                        <h4 className="Header-card">Route Optimization</h4>
                        <p className="body-card">
                          Perfect for road trips and saving $$$ on gas! Get the
                          best route auto-rearranged.
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
              <div className="card">
                <section class="articles">
                  <article>
                    <div class="article-wrapper">
                      <figure className="figure">
                        <img
                          src={weatherForecast}
                          alt=""
                          width="170px"
                          height="100px"
                          left="5vh"
                        />
                      </figure>
                      <div class="article-body">
                        <h4 className="Header-card">Weather Forecast</h4>
                        <p className="body-card">
                          analysis of the state of the weather in an destination
                          you travel...
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <section class="articles">
                  <article>
                    <div class="article-wrapper">
                      <figure className="figure">
                        <img
                          src={routeOptimize}
                          alt=""
                          width="170px"
                          height="100px"
                        />
                      </figure>
                      <div class="article-body">
                        <h4 className="Header-card">Route Optimization</h4>
                        <p className="body-card">
                          Perfect for road trips and saving $$$ on gas! Get the
                          best route auto-rearranged.
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
              <div className="card">
                <section class="articles">
                  <article>
                    <div class="article-wrapper">
                      <figure className="figure">
                        <img
                          src={weatherForecast}
                          alt=""
                          width="170px"
                          height="100px"
                          left="5vh"
                        />
                      </figure>
                      <div class="article-body">
                        <h4 className="Header-card">Weather Forecast</h4>
                        <p className="body-card">
                          analysis of the state of the weather in an destination
                          you travel...
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-section">
        <div className="Gallery">
          <div className="Features2">Find popular destination...</div>
          <br />
          <br />
          <div className="airBallon">
            <img src={airBallon} alt="" height="250px" width="280px" />
          </div>
          <div className="image-gallery">
            <div class="responsive">
              <div class="gallery">
                <a target="_blank">
                  <img src={dunhinda} alt="Cinque Terre" />
                </a>
                <div class="desc">Dunhinda</div>
              </div>
            </div>

            <div class="responsive">
              <div class="gallery">
                <a target="_blank">
                  <img src={pasikuda} alt="Forest" />
                </a>
                <div class="desc">Pasikuda</div>
              </div>
            </div>

            <div class="responsive">
              <div class="gallery">
                <a target="_blank">
                  <img src={sigiriya} alt="Northern Lights" />
                </a>
                <div class="desc">Sigiriya</div>
              </div>
            </div>

            <div class="responsive">
              <div class="gallery">
                <a target="_blank">
                  <img src={Kabaragala} alt="Mountains" />
                </a>
                <div class="desc">Kabaragala</div>
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div>
            <br />
            <br />
            <Button
              href="/gallery"
              sx={{
                marginLeft: "auto",
                color: "white",
                backgroundColor: "#EF7E2A",
                borderRadius: "6px",
                left: "163vh",
                top: "5px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#EF7E2A",
                },
              }}
            >
              More ...
            </Button>
          </div>
        </div>
      </div>
      <div className="div-section">
        <div className="contactUs">
          <div className="Features2">Feel free to ask anything from us ...</div>
          <div className="contact-us-body">
            <div className="col01">
              <div className="row01">
                <p className="p-contUs">
                  We value your connection and are eager to hear from you.
                  JourneyJive, your trusted travel companion, is always just a
                  message away. Whether you have questions, feedback, or simply
                  want to share your travel stories, we're here to listen and
                  assist.
                  <br />
                  Together, let's create meaningful memories and explore the
                  world with JourneyJive.
                </p>
              </div>
              <div className="row02">
                <img
                  src={travelPack}
                  alt=""
                  height="520px"
                  width="740px"
                  position="relative"
                />
              </div>
            </div>
            <div className="col02">
              <ContactUs />
            </div>
          </div>
          <div className="footer">
            <div className="footer-txt-div">
              <p className="footer-txt">© 2023 copy right JourneyJive.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
