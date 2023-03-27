import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

const HomePageLinkIcon = () => {
  return (
    <div className="HomeIcon">
    <a href="/"><HomeIcon
      sx={{
        position: "absolute",
        color: "#E86E18",
        backgroundColor: "rgb(238, 238, 238)",
        borderRadius: "5px",
        height: "30px",
        width: "30px",
        marginTop:"6vh",
        marginLeft: "6vh",
      }} /></a>
  </div>
  )
}

export default HomePageLinkIcon