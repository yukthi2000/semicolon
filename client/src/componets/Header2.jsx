import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import RateReviewIcon from "@mui/icons-material/RateReview";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header2 = () => {
  

  // const handleLogout  =() =>{
  //   localStorage.removeItem("accessToken");
  // }

  // const settings = [
  //   { label: "Profile", link: "/userProfile" },
  //   { label: "Logout", onClick: handleLogout  },
  // ];

  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar
      sx={{
        backgroundColor: "rgb(7, 94, 26)",
        borderBottom: "1px solid green",
        
        // backdropFilter: "blur(0px)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          href="/"
          sx={{
            flexGrow: 5,
            display: { xs: "none", sm: "block" },
            fontFamily: "Piedra",
            color: "#E86E18",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              flexGrow: 5,
              display: { xs: "none", sm: "block" },
              fontFamily: "Piedra",
              color: "#EF7E2A",
              
            }}
          >
            JourneyJive
          </Link>
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0.75, display: { xs: "none", sm: "block" } }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
          >
            Home
          </Link>
        </Typography>
        <OtherHousesOutlinedIcon
          sx={{ display: { xs: "block", sm: "none" }, marginRight: "20px" }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0.75, display: { xs: "none", sm: "block" } }}
        >
          <Link
            to="/gallery"
            style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
          >
            Gallery
          </Link>
        </Typography>
        <CollectionsIcon
          sx={{ display: { xs: "block", sm: "none" }, marginRight: "20px" }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0.75, display: { xs: "none", sm: "block" } }}
        >
          <Link
            to="/subscription"
            style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
          >
            Subscription
          </Link>
        </Typography>
        <CollectionsIcon
          sx={{ display: { xs: "block", sm: "none" }, marginRight: "20px" }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0.75, display: { xs: "none", sm: "block" } }}
        >
          <Link
            to="/review"
            style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
          >
            Review
          </Link>
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 5, display: { xs: "none", sm: "block" } }}
        >
          <Link
            to="/mapp"
            style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
          >
            MAP
          </Link>
        </Typography>
        <RateReviewIcon
          sx={{ display: { xs: "block", sm: "none" }, marginRight: "20px" }}
        />

{/*       
        {
        !localStorage.getItem("accessToken") ? (
          <>
            <a href="register">
              <Button
                sx={{
                  marginLeft: "auto",
                  color: "white",
                  backgroundColor: "#EF7E2A",
                  "&:hover": {
                    backgroundColor: "white",
                    color:"#EF7E2A"
                  }
                }}
              >
                Register
              </Button>
            </a>
            <a href="login">
              <Button
                sx={{
                  marginLeft: "20px",
                  color: "white",
                  backgroundColor: "#EF7E2A",
                  "&:hover": {
                    backgroundColor: "white",
                    color:"#EF7E2A"
                  }
                }}
              >
                Login
              </Button>
            </a>
          </>
        ) : (
          <>
            { <Button
              sx={{
                marginLeft: "20px",
                color: "Blue",
                backgroundColor: "white",
                height: "5vh",
                width: "5vh",
                borderRadius: "50%",
              }}
            >
              P
            </Button> }
            {<Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {setting.link ? (
                        <Link to={setting.link}>{setting.label}</Link>
                      ) : (
                        setting.label
                      )}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> }
          </>
        )
        } */}
        
      </Toolbar>
    </AppBar>
  );
};

export default Header2;