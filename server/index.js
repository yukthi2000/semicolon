
const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")



const app = express();

app.use(express.json());
app.use(cors())

app.listen(8001,()=>{
    console.log("connection successfull");
})


const db=mysql.createConnection(
    {
        user:"root",
        host:"localhost",
        password:"123258789",
        database:"mapdatabase"

    }
)