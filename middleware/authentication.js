const userModel = require("../model/User")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const authentication = async (req,res,next)=>{
    try {
        let token = req.header("Authorization").replace("Bearer ", "");
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        const user = await userModel.findOne({
            _id : decode.userId
        })
        if(!user){
            console.log(decoded)
            throw new Error("Please authenticate!");
        }
        req.token = token;
        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).send({ Error: "please authenticate!" });
    }
}

module.exports=authentication