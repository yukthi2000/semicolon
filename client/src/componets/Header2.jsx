import * as React from "react";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom"

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined'; 
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Header2=()=> {
  return (
        <AppBar sx={{
            background: "#08170D",
            borderBottom:"1px solid green",
            backdropFilter: 'blur(10px)'}}>
        <Toolbar>
          <Typography variant="h4" 
            component="div"
            href="/" 
            sx={{ 
                    flexGrow: 5, 
                    display:{xs:"none", sm:"block"}, 
                    fontFamily: 'Piedra',
                    color:"#E86E18"
                }}>
                  <Link to="/" style={{ textDecoration: 'none',flexGrow: 5, 
                    display:{xs:"none", sm:"block"}, 
                    fontFamily: 'Piedra',
                    color:"#E86E18"  }}>
            JourneyJive
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 0.75, display: { xs: 'none', sm: 'block' } }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>
            Home
          </Link>
        </Typography>
        <OtherHousesOutlinedIcon sx={{display:{xs:"block", sm:"none"}, marginRight: '20px'}}/>

        <Typography variant="h6" component="div" sx={{ flexGrow: 0.75, display: { xs: 'none', sm: 'block' } }}>
          <Link to="/gallery" style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>
            Gallery
          </Link>
        </Typography>
        <CollectionsIcon sx={{display:{xs:"block", sm:"none"}, marginRight: '20px'}}/>

        <Typography variant="h6" component="div" sx={{ flexGrow: 5, display: { xs: 'none', sm: 'block' } }}>
          <Link to="/review" style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>
            Review
          </Link>
        </Typography>
        <RateReviewIcon sx={{display:{xs:"block", sm:"none"}, marginRight: '20px'}}/>
        
          
          <Button sx={{marginLeft:"auto", color:"white", backgroundColor:"#E86E18"}}>Register</Button>
        </Toolbar>
      </AppBar>
   
  );
}

export default Header2;