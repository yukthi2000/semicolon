const {verify}=require("jsonwebtoken")


const validToken = (req, res, next)=>{
    const accessToken=req.header("accessToken");
    if(!accessToken) return res.json({error:"user not log in"});
    try{
        const validToken =verify(accessToken, "importantsecret")
        if (validToken){
            return next();
        }
    }catch (err) {
        return res.json({error: err})
    }
};

module.exports={validToken};