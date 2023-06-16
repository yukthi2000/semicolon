import React from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./rating.css";
import axios from "axios";

const Viewer = () => {
  const [listofdata, setListofdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/Ratings/location", {
        params: {
          location: "your-location-value",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box>
      <Paper
        sx={{
          width: 400,
          borderRadius: 0,
          zIndex: 9999,
          position: "absolute",
          height: 250,
          marginTop: 25,
          marginLeft: 1.5,
          
        }}
      >
        <div
          className="locawe"
          style={{
            marginLeft: 10,
            marginTop: 10,
            marginRight: 10,
            display: "flex",
            justifyContent: "space-between",
            height: 55,
          }}
        >
          <div className="loc">{origin} name</div>
          <div className="we">weather</div>
        </div>
        <hr />
        <div
          className="title"
          style={{
            marginLeft: 10,
          }}
        >
          Reviews
        </div>
        <div className="reviews">
          {listofdata.map((value, key) => {
            return (
              <div className="all">
                <div className="card">
                  <div className="rating">{value.rating}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Paper>
    </Box>
  );
};

export default Viewer;
