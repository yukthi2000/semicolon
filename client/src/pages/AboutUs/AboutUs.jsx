import React from "react";
import "./AboutUs.css";
import background from "../../assets/About us.jpg";

const AboutUs = () => {
  return (
    <div className="aboutUs">
      <div className="background">
        <img src={background} alt="" className="background_image" />
      </div>

      <div className="graph_1">
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
            <p>
              your passport to seamless travel planning and unforgettable
              adventures. Our mission is to inspire and empower travelers like
              you to explore the world and create lifelong memories. JourneyJive
              is your one-stop destination for everything travel-related.
              Discover exciting destinations, from hidden gems to popular
              hotspots, through our comprehensive location search. Gain valuable
              insights from fellow travelers by reading and writing reviews,
              helping you make informed decisions about your next journey.
              Capture the essence of your experiences with our image upload
              feature, and be inspired by the stunning visuals shared by our
              vibrant travel community.
            </p>

            <p>
              Let us optimize your itinerary with our intelligent route
              planning, ensuring you make the most of your time and visit the
              must-see attractions. Stay ahead of the weather with our real-time
              forecasts, providing you with the information you need to pack
              appropriately and plan your activities accordingly. And the best
              part? Save all your trip details and itineraries in one place,
              easily accessible whenever you need them. JourneyJive is here to
              simplify your travel planning process, leaving you free to focus
              on the joy of exploration. So embark on your next adventure with
              confidence and let JourneyJive be your trusted companion on this
              extraordinary journey.
            </p>
          </h5>
        </div>
        <div>
          <h4>
            Adventure awaits. Let JourneyJive be your compass and turn your
            travel dreams into cherished memories.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
