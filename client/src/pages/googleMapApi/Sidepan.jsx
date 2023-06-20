import { Paper } from "@mui/material";
import React from "react";
import "./sidepan.css";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Link } from "react-router-dom";

const Sidepan = (prop) => {
  return (
    
      <Box>
        <Paper
          elevation={12}
          sx={{
            width: 400,
            height: 250,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",

            backgroundColor: "#435555",
          }}
        >
          <Box  className="div1" sx={{width: 379,
              height: 228,justifyContent:"space-around",
              flexDirection:"column",display:"flex"}}>
         
            <Link to="Tripplan">
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: 220,
                  backgroundColor: "#EF7E2A",
                  "&:hover": {
                    backgroundColor: "#368C18",
                  },
                }}
              >
                <LuggageIcon  sx={{ marginRight: 4 }} /> Plan a Trip
              </Button>
            </Link>
            <Button
              onClick={prop.handlesearch}
              variant="contained"
              size="large"
              sx={{
                width: 220,
                backgroundColor: "#EF7E2A",
                "&:hover": {
                  backgroundColor: "#368C18",
                },
              }}
            >
              {" "}
              <LocationOnIcon sx={{ marginRight: 4 }} />
              Search
            </Button>
            </Box>
        </Paper>
      </Box>
    
  );
};

export default Sidepan;
