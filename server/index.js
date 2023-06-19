const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ratings'
});

connection.connect();
app.use(express.json());
app.use(cors());


//Routes

    //Past reviews
    app.get('/api/ratings/:placeId', (req,res) => { 
      if(req.params.placeId){
          res.set('Access-Control-Allow-Origin', '*');
          connection.query(`SELECT * FROM userRatingsPlace where placeId="${req.params.placeId}"`, (err, rows, fields) => {
              if (err) throw err
              if(rows)
                  res.send(rows);
              else
                  res.send("place not found");
  
            })
      }
      else{    
          res.status(400).send("Bad request. Please provide place id");
      }
  });
  
      // Add review
      app.post('/api/ratings/:placeId/:userId', (req, res) => {
          if(req.body.avgRating && req.body.comment){
              res.set('Access-Control-Allow-Origin', '*');
              connection.query(`INSERT INTO userRatingsPlace (placeId, userId, avgRating, comment) VALUES( "${req.params.placeId}", "${req.params.userId}", "${req.body.avgRating}", "${req.body.comment}")`, (err, rows, fields) => {
              if (err) throw err
              else
              res.send("Data Saved Successully");
            })
  
          }else{
              res.status(400).send("data not found in the body");
          }
      });
  
  //     //Past reviews
  // app.get('/api/ratingsPlaceId/:place', (req,res) => { 
  //     if(req.params.place){
  //         res.set('Access-Control-Allow-Origin', '*');
  //         connection.query(`SELECT placeId FROM place where name="${req.params.place}"`, (err, rows, fields) => {
  //             if (err) throw err
  //             if(rows)
  //                 res.send(rows);
  //             else
  //                 res.send("place not found");
  
  //                 // create place if it doesn't exit and return its Id
  
  //           })
  //     }
  //     else{    
  //         res.status(400).send("Bad request. Please provide place id");
  //     }
  // });
  
  // return place ID
  app.post('/api/ratingsPlaceId', (req, res) => {
      
      if(req.body.placeName){
          res.set('Access-Control-Allow-Origin', '*');
          
          connection.query(`SELECT placeId FROM place where name="${req.body.placeName}"`, (err, rows, fields) => {
              if (err) throw err
              if(rows[0])
                  res.send(rows[0]);
              else{
                  //res.send("place not found");
                  const randomId = uuidv4();
                  connection.query(`INSERT INTO place (name, placeId) VALUES( "${req.body.placeName}", "${randomId}")`, (err, rows, fields) => {
                      if (err) throw err
                  });
                  const data = [
                      {
                        placeId: randomId
                      }
                    ];
                    
                    
                  res.send(data[0]); 
              }
              
        })
  
      }else{
          res.status(400).send("data not found in the body");
      }
  });
  
  // delete rating function
  app.get('/api/deleteRating/:ratingId', (req,res) => { 
      if(req.params.ratingId){
          res.set('Access-Control-Allow-Origin', '*');
          connection.query(`delete FROM userRatingsPlace where ratingId="${req.params.ratingId}"`, (err, rows, fields) => {
              if (err) throw err
              res.status(200).send(req.params.ratingId);
            })
      }
      else{    
          res.status(400).send("rating ID not included");
      }
  });
  
  // Get Place Average Rating
  app.get('/api/avgRating/:placeId', (req,res) => { 
      if(req.params.placeId){
          res.set('Access-Control-Allow-Origin', '*');
          connection.query(`SELECT AVG(avgRating) AS averageRating, COUNT(avgRating) AS count FROM  userRatingsPlace where placeId="${req.params.placeId}"`, (err, rows, fields) => {
              if (err) throw err
                  if(rows[0])
                      res.status(200).send(rows);
            })
      }
      else{    
          res.status(400).send("placeID invalid");
      }
  });

app.use(express.json());
app.use(cors());

const db = require("./models");

// routers
const userRouter = require("./routes/User");
app.use("/auth", userRouter);

const ArrayRouter = require("./routes/Array");
app.use("/Array", ArrayRouter);

const RatingsRouter = require("./routes/Ratings");
app.use("/Ratings", RatingsRouter);

const TripRouter = require("./routes/Trip");
app.use("/Trips", TripRouter);


const LocationRouter = require("./routes/Locations");
app.use("/Locations",LocationRouter);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server is running");
  });
});

app.listen(3001, () => {console.log(`Listening on port 3001`);});

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
