
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

app.post("/googleMapApi",(req,res)=>{
    const startlocation=req.body.startlocation;
    console.log(startlocation);
    const endlocation=req.body.endlocation;
    db.query("insert into locations(start,end) values(?,?)",[startlocation,endlocation],(err,result)=>{
        console.log(err);
    })
})