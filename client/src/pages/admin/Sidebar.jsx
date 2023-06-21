import React from 'react';
import "./Admin.css";
import logo from "../../assets/logo.png"
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import { Link} from "react-router-dom";


const Sidebar = () => {
  return (
   <div className="sidebar">
    <div className="logo">
        <img alt='' src={logo}/>
        <span>
        JorneyJive
        </span>
    </div>
    <div className="menuList">
        <div className="menuItem">
            <div>
            <GridViewRoundedIcon/>
            </div>
            <span><Link to="/admin">Dashoboard</Link></span>
        </div>
        <div className="menuItem">
            <div>
            <CollectionsBookmarkRoundedIcon/>
            </div>
            <span><Link to="/admin/gallery-view">Gallery</Link></span>
        </div>
        <div className="menuItem">
            <div>
            <GridViewRoundedIcon/>
            </div>
            <span><Link to="/admin/reviews-view">Reviews</Link></span>
        </div>
        <div className="menuItem">
            <div>
            <GridViewRoundedIcon/>
            </div>
            <span>Reports</span>
        </div><br/><br/><br/><br/><br/><br/>
        <div className="menuItem">
            <div>
            <GridViewRoundedIcon/>
            </div>
            <span><Link to="/">Logout</Link></span>
        </div>
    </div>

   </div>

  )
}

export default Sidebar