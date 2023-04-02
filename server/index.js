const express = require("express")
const app= express();
const cors = require("cors");

app.use(express.json());
app.use(cors())

const db = require('./models')

// routers
const userRouter = require('./routes/User')
app.use("/auth", userRouter);

db.sequelize.sync().then(()=>{
    app.listen(3001, () => {
        console.log("server is running")
    })
})
