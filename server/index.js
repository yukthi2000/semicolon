
const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")
const app = express();

const db = require ('./models')

//Routers
// const weatherOptionsRouter = require('./routes/WeatherOptions')
// app.use("/weatherOptions",weatherOptionsRouter);
app.use(express.json());
app.use(cors())

db.sequelize.sync().then(()=>{

    app.listen(3001,()=>{
        console.log("connection successfull");
    });

});


// const db=mysql.createConnection(
//     {
//         user:"root",
//         host:"localhost",
//         password:"123258789",
//         database:"mapdatabase"

//     }
// )