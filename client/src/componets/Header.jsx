import * as React from "react";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom"

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined'; 
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Header=()=> {
  const [transparent, setTransparent] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 650 && transparent) {
        setTransparent(false);
      } else if (scrollTop <= 650 && !transparent) {
        setTransparent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  const navStyle = {
    background: transparent ? 'transparent' : '#08170D',
    borderBottom: transparent ? '1px solid green' : '1px solid gray',
    backdropFilter: transparent ? 'blur(10px)' : 'none',
  };

  return (
    <AppBar sx={navStyle}>
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
          JourneyJive
        </Typography>
        
        <YardOutlinedIcon sx={{display:{xs:"block", sm:"none"}, fontSize: 40,marginRight: '30px'}}/>

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
          <Link to="/register">
        <Button sx={{marginLeft:"auto", color:"white", backgroundColor:"#E86E18"}}>Register</Button>
          </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
