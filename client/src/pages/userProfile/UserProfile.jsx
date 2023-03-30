import React from "react";
import "./UserProfile.css";
import { BiDotsVertical } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";



const UserProfile = () => {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-header">
        <div className="home-btn">
                <HomePageLinkIcon />
          </div>
          <div className="header-data"><h2>Hello Dilini </h2><h5>Good morning!</h5></div>
          <div className="dropdown">
            <div className="drop-down"><BiDotsVertical className="dot-icon" onClick={handleOpen} />
              {open ? (
                <ul className="menu">
                  <li className="menu-item" data-bs-toggle="modal" data-bs-target="#userRegister">
                    <FaUserEdit />&nbsp;Edit profile<hr className="hr2" />
                  </li>
                  <li className="menu-item">
                    <AiOutlineLogout />&nbsp;Logout
                  </li>
                </ul>
              ) : null}

            </div>
          </div>
        </div>
        <div className="profile-frame"></div>
      </div>
      <div>
        <hr className="hr" />
        <div className="profile-body-up">
          <ul className="profile-nav">
            <li className="profile-nav2">
              <Link to="/userProfile" className="link"> Gallery</Link>
            </li>

            <li className="profile-nav2">
              <Link to="/userProfile/review" className="link"> Review</Link>
            </li>

            <li className="profile-nav2">
              <Link to="/userProfile/plannedTrip" className="link"> Trip</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="probody">
        <div className="profile-body-down">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default UserProfile