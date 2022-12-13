const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    caption:{
        type:String,
        required:true,
        trim:true
    },
    imageLink:{
        type:String,
        trim:true
    },
    userId:{
        type:String,
        trim:true
    }
})




//Model

const postModel = mongoose.model("post", postSchema)
module.exports=postModel