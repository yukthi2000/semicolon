import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Gallery from "./pages/gallery/Gallery";
import Review from "./pages/review/Review";
import GoogleMapApi from "./pages/googleMapApi/GoogleMapApi";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/login/ForgetPassword";
import PasswordReset from "./pages/login/PasswordReset";
import Datafortrip from "./pages/googleMapApi/Datafortrip";
import Mapmore from "./pages/googleMapApi/Mapmore";
import Tripplan from "./pages/googleMapApi/Plantrip";
import Subscription from "./pages/subscription/Subscription";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="review" element={<Review />} />
        <Route path="googleMapApi" element={<GoogleMapApi />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="reset-password" element={<PasswordReset />} />
        <Route path="subscription" element={<Subscription /> } />
        <Route path="mapp" element={<Mapmore />} />
        <Route path="mapp/Tripplan" element={<Tripplan />} />
      </Routes>
    </div>
  );
};

export default App;
