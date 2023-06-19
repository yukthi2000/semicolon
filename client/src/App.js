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
import Mapmore from "./pages/googleMapApi/Mapsinglelocation/Mapmore";
import Tripplan from "./pages/googleMapApi/mapforsavedata/Plantrip";
import Subscription from "./pages/subscription/Subscription";
import UserProfile from "./pages/userProfile/UserProfile";
import UserGallery from "./pages/userProfile/userGallery/UserGallery";
import UserReview from "./pages/userProfile/userReview/UserReview";
import PlannedTrip from "./pages/userProfile/plannedTrip/PlannedTrip";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import GalleryView from "./pages/admin/GalleryView";
import ReviewsView from "./pages/admin/ReviewsView";
import { Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Header2 from "./componets/Header2";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import ContactUs from "./pages/ContactUs/ContactUs";
import Showtrips from "./pages/googleMapApi/ShowTrips/Showtrips";

const App = () => {
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    id: 0,
    status: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            name: response.data.name,
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred during authentication:", error);
        setError("An error occurred during authentication.");
      });
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      name: "",
      email: "",
      id: 0,
      status: false,
    });
    navigate("/");
  };

  //Avatar drop down
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div>
          <div className="abc2">
            <Header2 />
          </div>
          <div className="abc">
            {!authState.status ? (
              <>
                <div className="abc">
                  <Button
                    href="/login"
                    sx={{
                      marginLeft: "auto",
                      color: "white",
                      backgroundColor: "#EF7E2A",
                      borderRadius: "6px",
                      left: "91vh",
                      top: "5px",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#EF7E2A",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    href="/register"
                    sx={{
                      marginLeft: "auto",
                      color: "white",
                      backgroundColor: "#EF7E2A",
                      borderRadius: "6px",
                      left: "95vh",
                      top: "5px",

                      "&:hover": {
                        backgroundColor: "white",
                        color: "#EF7E2A",
                      },
                    }}
                  >
                    Register
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="abc">
                  {" "}
                  {/* <Button
                    sx={{
                      marginLeft: "auto",
                      color: "white",
                      backgroundColor: "#EF7E2A",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#EF7E2A",
                      },
                    }}
                    onClick={logout}
                  >
                    Logout
                  </Button> */}
                  {/* <button onClick={logout}>Logout</button> */}
                </div>
                <div className="abc1">
                  {/* <Link to="/userProfile">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </Link> */}

                  <div className="dropdown" ref={dropdownRef}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      onClick={toggleDropdown}
                    />
                    {isOpen && (
                      <div
                        className="dropdown-content"
                        onClick={handleOutsideClick}
                      >
                        <h4 className="Name">{authState.name}</h4>
                        <a className="view-profile" href="/userProfile">
                          View Profile
                        </a>
                        <button className="logout-button" onClick={logout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {/* <div className="UserName">
              <h4 className="Name">{authState.name}</h4>
            </div> */}
          </div>
        </div>

        {/* <div>
      {authState && <p>User is authenticated.</p>}
    </div> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="review" element={<Review />} />
          <Route path="googleMapApi" element={<GoogleMapApi />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password" element={<PasswordReset />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="mapp" element={<Mapmore />} />
          <Route path="mapp/Tripplan" element={<Tripplan />} />
          <Route path="/contactUs" element={<ContactUs />} />
          {/* <Route path="PlannedTrips" element={<Showtrips />} /> */}

          <Route path="userProfile" element={<UserProfile />}>
            <Route path="" element={<UserGallery />} />
            <Route path="review" element={<UserReview />} />
            <Route path="plannedTrip" element={<Showtrips />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="" element={<Dashboard />} />
            <Route path="gallery-view" element={<GalleryView />} />
            <Route path="reviews-view" element={<ReviewsView />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
