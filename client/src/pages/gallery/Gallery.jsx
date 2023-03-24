import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Header2 from "../../componets/Header2";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./gallery.css";
import LuggageIcon from "@mui/icons-material/Luggage";
import homeBg from "../../assets/homeBG.jpg";

const Gallery = () => {
  const [datas, setDatas] = useState([{ data: "" }]);
  console.log(datas);
  const handletext = () => {
    setDatas([...datas, { data: "" }]);
  };
  const handleservice = (index) => {
    const list = [...datas];
    list.splice(index, 1);
    setDatas(list);
  };
  const handleinput = (e, index) => {
    const { name, value } = e.target;
    const list = [...datas];
    list[index][name] = value;
    setDatas(list);
  };

  const texthandle = () => {};
  return (
    <div>
      <Header2 />

      <div style={{ height: 100 }}></div>
      {datas.map((singledata, index) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div key={index}>
            <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              onDragEnter={handleinput}
            />
            {datas.length - 1 === index && datas.length < 4 && (
              <Button varient="contained" onClick={handletext}>
                add
              </Button>
            )}
          </div>
          <div>
            {datas.length > 1 && (
              <Button varient="contained" onClick={handleservice}>
                delete
              </Button>
            )}
          </div>
        </div>
      ))}
      {datas.map((singledata, index) => {
        <ul key={index}>{singledata.data && <li>{singledata.data}</li>}</ul>;
      })}
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
          <div
            className="div1"
            style={{
              width: 379,
              height: 228,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                width: 220,
                backgroundColor: "#EF7E2A",
                "&:hover": {
                  backgroundColor: "#368C18",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <LocationOnIcon sx={{ marginRight: 4 }} /> Plan a Trip
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: 220,
                backgroundColor: "#EF7E2A",
                "&:hover": {
                  backgroundColor: "#368C18",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              {" "}
              <LuggageIcon sx={{ marginRight: 4 }} />
              Search
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Gallery;
