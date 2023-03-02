import * as React from "react";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined'; 
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Header=()=> {
  return (
        <AppBar sx={{
            background: "transparent",
            borderBottom:"1px solid green",
            backdropFilter: 'blur(10px)'}}>
        <Toolbar>
          <Typography variant="h4" 
            component="div" 
            sx={{ 
                    flexGrow: 5, 
                    display:{xs:"none", sm:"block"}, 
                    fontFamily: 'Piedra',
                    color:"#E86E18"
                }}>
            JourneyJive
          </Typography>
          <YardOutlinedIcon sx={{display:{xs:"block", sm:"none"}, fontSize: 40,marginRight: '30px'}}/>
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 0.75, display:{xs:"none", sm:"block"} }}>
            Home
          </Typography>
          <OtherHousesOutlinedIcon sx={{display:{xs:"block", sm:"none"}, marginRight: '20px'}}/>
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 0.75, display:{xs:"none", sm:"block"} }}>
            Gallery
          </Typography>
          <CollectionsIcon sx={{display:{xs:"block", sm:"none"}, marginRight: '20px'}}/>
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 5, display:{xs:"none", sm:"block"}}}>
            Review
          </Typography>
          <RateReviewIcon sx={{display:{xs:"block", sm:"none"},marginRight: '20px'}}/>
          
          <Button sx={{marginLeft:"auto", color:"white", backgroundColor:"#E86E18"}}>Login</Button>
        </Toolbar>
      </AppBar>
   
  );
}

export default Header;