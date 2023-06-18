import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { BiDotsVertical } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import { useParams } from "react-router-dom";
import axios from "axios"


const UserProfile = () => {

  let { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicInfo/${id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);

      });
  }, []);
  

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="user-profile">
      <div className="left-side">
        <div className="profile-frame"></div>
        <div className="proInfo">
          <div><h5>{name}</h5></div>
          <div><h5>{email}</h5></div>
        </div>
      </div>

      <div className="right-side">
        <div className="navBar">
          <div>
           
            <div className="profile-body-up">
              <ul className="profile-nav">
                <li className="profile-nav2">
                <Link to={`/userProfile/${id}`} className="link">
                  
                    Gallery
                  </Link>
                </li>

                <li className="profile-nav2">
                <Link to={`/userProfile/${id}/review`} className="link">
                    
                    Review
                  </Link>
                </li>

                <li className="profile-nav2">
                <Link to={`/userProfile/${id}/plannedTrip`} className="link">              
                    Trip
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="proBody">
          
            <div className="profile-body-down">
              <Outlet />
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
