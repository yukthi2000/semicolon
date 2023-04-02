import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Gallery from "./pages/gallery/Gallery";
import Review from "./pages/review/Review";
import GoogleMapApi from "./pages/googleMapApi/GoogleMapApi";
import Register from "./pages/login/Register";
import Register2 from "./pages/login/Register2";
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/login/ForgetPassword";
import PasswordReset from "./pages/login/PasswordReset";
import Datafortrip from "./pages/googleMapApi/Datafortrip";
import Mapmore from "./pages/googleMapApi/Mapmore";
import Tripplan from "./pages/googleMapApi/Plantrip";
import Subscription from "./pages/subscription/Subscription";
import UserProfile from "./pages/userProfile/UserProfile";
import UserGallery from "./pages/userProfile/userGallery/UserGallery";
import UserReview from "./pages/userProfile/userReview/UserReview";
import PlannedTrip from "./pages/userProfile/plannedTrip/PlannedTrip";
import Sidebar from "./pages/admin/Sidebar";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import GalleryView from "./pages/admin/GalleryView";
import ReviewsView from "./pages/admin/ReviewsView";



const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="review" element={<Review />} />
        <Route path="googleMapApi" element={<GoogleMapApi />} />
        <Route path="register" element={<Register />} />
        <Route path="register2" element={<Register2 />} />
        <Route path="login" element={<Login />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="reset-password" element={<PasswordReset />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="mapp" element={<Mapmore />} />
        <Route path="mapp/Tripplan" element={<Tripplan />} />
        <Route path="userProfile" element={<UserProfile />} >
          <Route path="" element={<UserGallery />} />
          <Route path="review" element={<UserReview />} />
          <Route path="plannedTrip" element={<PlannedTrip />} />
        </Route>
        <Route path="admin" element={<Admin />}>
        <Route path="" element={<Dashboard />} />
        <Route path="gallery-view" element={<GalleryView />} />
        <Route path="reviews-view" element={<ReviewsView />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
