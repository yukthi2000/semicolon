const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// routers
const userRouter = require("./routes/User");
app.use("/auth", userRouter);

const LocationRouter = require("./routes/Locations");
app.use("/Locations", LocationRouter);

const weatherOptionsRouter = require('./routes/WeatherOptions')
app.use("/WeatherOptions", weatherOptionsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server is running");
  });
});

// db.sequelize.sync().then(()=>{
//     app.listen(3002, () => {
//         console.log("server is running")
//     })
// })


// const db=mysql.createConnection(
//     {
//         user:"root",
//         host:"localhost",
//         password:"123258789",
//         database:"mapdatabase"

//     }
// )

// app.post("/googleMapApi",(req,res)=>{
//     const startlocation=req.body.startlocation;
//     console.log(startlocation);
//     const endlocation=req.body.endlocation;
//     db.query("insert into locations(start,end) values(?,?)",[startlocation,endlocation],(err,result)=>{
//         console.log(err);
//     })
// })
