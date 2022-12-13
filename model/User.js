const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    mobile_number:{
        type:String,
        required:true,
        trim:true
    },
    dob:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})




//Model

const userModel = mongoose.model("user", userSchema)
module.exports=userModel