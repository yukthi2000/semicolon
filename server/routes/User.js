const express = require('express');
const router = express.Router();
const {User} = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken")

// router.get('/auth', async (req, res) =>{
//     const listOfUsers = await User.findAll()
//     res.json(listOfUsers); 
// })

router.post("/", async (req, res)=>{
    const {name, email, password, confirmPassword} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        User.create({
            name: name,
            email: email,
            password: hash,
            confirmPassword: hash,
        });
        res.json("success")
    })
})

router.post("/login", async (req, res)=>{
    const{email, password} = req.body;

    const user = await User.findOne({where: {email : email}})

    if(!user) res.json({error:"User doesn't exist"});

    bcrypt.compare(password, user.password).then(async(match)=>{
        if(!match) res.json({error:"Wrong username and password combination"});
 
    const accessToken = sign(
        {email: user.email, id:user.id},  
        "importantsecret"
        );
            res.json(accessToken);
    });
});

module.exports=router;