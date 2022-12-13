const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const app=express()
app.use(cors())
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
app.use(express.json())
const userRouter = require("./router/userRouter")
const connectDb = require("./config/connectdb")


// database connection
connectDb(DATABASE_URL)



  app.use("/api/user", userRouter)


app.listen(PORT, ()=>{
    console.log(`Server Runing On Port ${PORT}`)
})