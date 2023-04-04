const express = require('express');
const router = express.Router();
const {WeatherOptions} = require("../models");
const bcrypt = require("bcrypt")

router.get('/', async (req, res) =>{
    const weatherResponses = await WeatherOptions.findAll();
    res.json(weatherResponses);
});


router.post('/', async (req,res)=>{
    const weatherOptions = req.body;
    await WeatherOptions.create(weatherOptions);
    res.json(weatherOptions);
});

// router.post("/", async (req, res)=>{
//     const {name, email, password, confirmPassword} = req.body;
//     bcrypt.hash(password, 10).then((hash)=>{
//         User.create({
//             name: name,
//             email: email,
//             password: hash,
//             confirmPassword: confirmPassword,
//         });
//         res.json("success")
//     })
// })

// router.post("/login", async (req, res)=>{
//     const{email, password} = req.body;

//     const user = await User.findOne({where: {email : email}})

//     if(!user) res.json({error:"User doesnt exist"});

//     bcrypt.compare(password, user.password).then((match)=>{
//         if(!match) res.json({error:"Wrong username and password combination"})
//     })

//     res.json("YOU LOGGED IN!!!")
// })

module.exports=router;