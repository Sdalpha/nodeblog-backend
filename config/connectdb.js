const express = require("express")
const mongoose = require("mongoose")

const connectDb = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            dbName : "NodeBlog",
            useNewUrlParser: true,
            useUnifiedTopology:true
        }
        
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        const con = mongoose.connection
        console.log("Database Connected..")

    } catch (error) {
        console.log(error)
    }
}

module.exports= connectDb