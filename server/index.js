const express = require("express")
const app= express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require('./models')

// routers
const userRouter = require('./routes/User')
app.use("/auth", userRouter);

const weatherOptionsRouter = require('./routes/WeatherOptions')
app.use("/WeatherOptions", weatherOptionsRouter);

db.sequelize.sync().then(()=>{
    app.listen(3002, () => {
        console.log("server is running")
    })
})