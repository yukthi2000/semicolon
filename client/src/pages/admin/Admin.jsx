import React from 'react';
import "./Admin.css";
import Sidebar from './Sidebar';
import {Outlet } from "react-router-dom";

import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import Avatar from '@mui/material/Avatar';
import Dashboard from './Dashboard';

const Admin = () => {
  return (
    <div className='admin'>
      <div><Sidebar /></div>
      <div className='admin-content'>
        <div className='admin-content-header'>
          <h2>Admin Dashboard</h2>
          <div className='home-btn'><HomePageLinkIcon/></div>
          <div><Avatar sx={{ bgcolor: "purple", marginLeft: "105vh" }}>OP</Avatar></div>
          </div>
        <div className='admin-content-body'>
         <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Admin