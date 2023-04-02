
const express=require("express")
const app = express();

app.use(express.json());

const db = require ('./models')

//Routers
const weatherOptionsRouter = require("./routes/WeatherOptions");
app.use("/weatherOptions",weatherOptionsRouter);

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