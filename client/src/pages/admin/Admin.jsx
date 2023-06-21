import React , { useState, useEffect } from "react";
import "./Admin.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Link} from "react-router-dom";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import Avatar from "@mui/material/Avatar";
import Dashboard from "./Dashboard";
import travelLogoAdmin from "../../assets/travelLogoAdmin.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BiHistory } from "react-icons/bi";
import axios from "axios"

const Admin = () => {

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
    
const history = useNavigate();

  return (
    <div className="admin">
      <div className="admin-sidebar">
        <div className="admin-sidebar-topic">
          <h3>Admin Dashboard</h3>
          <div><h6>{name}</h6></div>
          <div><h6>{email}</h6></div>
        </div>
        <div className="admin-sidebar-btn">
          <button class="button-24" role="button" onClick={() => history(`/admin/${id}`)}>
            Dashboard
          </button>
          <button class="button-24" role="button" onClick={() => history(`/admin/${id}/gallery-view`)}>
            Gallery
          </button>
          <button class="button-24" role="button" onClick={() => history(`/admin/${id}/reviews-view`)}>
            Review
          </button>
        </div>
        <div className="travel-logo-admin">
        <img
            src={travelLogoAdmin}
            alt=""
            height="220px"
            width="350px"
            position="relative"
          />
        </div>
      </div>
      <div className="admin-content">
        {/* <div className="admin-header">
          <div className="admin-header-topic"><h3>Admin Dashboard</h3></div>
        </div> */}
        <div className="admin-content-body">
          <div>
          <Outlet/>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Admin;
