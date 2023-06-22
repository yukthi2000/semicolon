const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// routers
const userRouter = require("./routes/User");
app.use("/auth", userRouter);

const RatingsRouter = require("./routes/Ratings");
app.use("/Ratings", RatingsRouter);

const TripRouter = require("./routes/Trip");
app.use("/Trips", TripRouter);


const LocationRouter = require("./routes/Locations");
app.use("/Locations",LocationRouter);


const weatherOptionsRouter = require('./routes/WeatherOptions')
app.use("/WeatherOptions", weatherOptionsRouter);

const tripDayWeatherRouter = require('./routes/TripDayWeather')
app.use("/TripDayWeather", tripDayWeatherRouter);

const weatherScoreRouter = require('./routes/WeatherScore')
app.use("/WeatherScore", weatherScoreRouter);
const ContactUsRouter = require("./routes/ContactUs");
app.use("/contactUs", ContactUsRouter);

const ReviewRouter = require("./routes/Review");
app.use("/reviews", ReviewRouter);

//gallery
// const imageRoutes = require("./routes/imageRoutes");
// app.use('/api/images', imageRoutes);

//ForgetPassword
const forgetPasswordRoutes = require("./routes/ForgetPassword");
app.use('/passwordReset',forgetPasswordRoutes);

app.use(express.static('public'));

const imageRoutes = require("./routes/Image");
app.use('/images', imageRoutes);

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
