import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Gallery from "./pages/gallery/Gallery";
import Review from "./pages/review/Review";
import GoogleMapApi from "./pages/googleMapApi/GoogleMapApi";
import Register from "./pages/login/Register";
import Header2 from "./componets/Header2";
import Login from "./pages/login/Login";



const App=() =>{
  return (
    <div className="App">
      <Header2/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="review" element={<Review />} />
          <Route path="googleMapApi" element={<GoogleMapApi />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login/>}/>


       </Routes>
    </div>
  );
};

export default App;
