const userModel = require("../model/User")
const postModel = require("../model/Post")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")





    exports.userRegistration = async (req,res)=>{
        const {name, email, password, mobile_number, dob, gender} = req.body
        const user = await userModel.findOne({email:email})
        if(user){
            res.send({
                status : "failed",
                message : "email already exists"
            })
        }else{
            if(name && email && password ){

                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)

                    const newUser = new userModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        mobile_number:mobile_number,
                        dob:dob,
                        gender:gender
                    })
                    await newUser.save()
                    const saved_user = await userModel.findOne({email:email})
                    const token = jwt.sign({userId: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                    res.status(201).send({
                        status: 200,
                        message : "Successfully Registered",
                        token : token
                    })
                    
                    
                } catch (error) {
                    console.log(error);
                    res.send({
                        status: "failed",
                        message : "Unable To Register"
                    })
                }

            }else{
                res.send({
                    status : "failed",
                    message : "All fields are required"
                })
            }
        }
    }

    exports.userLogin = async (req,res)=>{
        try {
            const {email,password}=req.body
            if(email && password){

                const user = await userModel.findOne({email:email})
                if(user != null){

                    const isMatch = await bcrypt.compare(password, user.password)
                    if(isMatch && (email === user.email)){
                        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                        res.send({
                            status : 200,
                            message : "Login Successfully",
                            token : token,
                            user : {
                                id : user.id,
                                name : user.name,
                                email : user.email
                            }
                        })

                    }else{
                        res.send({
                            status : "failed",
                            message : "Email Or Password Is Invalid"
                        })
                    }

                }else{
                    res.send({
                        status : "failed",
                        message : "You are not registerd. please register.."
                    })
                }

            }else{
                res.send({
                    status : "failed",
                    message : "All Fields Are Required"
                })
            }
            
        } catch (error) {
            console.log(error)
            res.send({
                status : "failed",
                message : "Unable To Login"
            })
        }
    }

    exports.createPost = async(req,res)=>{
        try {
            const user = req.user;
            const {title,caption,imageLink} = req.body
            if(title && caption){
                const createPost = new postModel({
                    title : title,
                    caption : caption,
                    imageLink : imageLink,
                    userId : user._id
                })
                await createPost.save()
                res.status(200).send({
                    message: "Post Created",
                    post : createPost
                })
            }else{
                res.status(200).send({
                    message: "title & caption are required feileds",
                })
            }
        } catch (error) {
            res.status(500).send("Server error");
        }
    }

    exports.getAllPost = async (req,res)=>{
        try {
            const allPosts = await postModel.find()
            if(allPosts){
                res.status(200).send({
                    allPosts : allPosts
                })
            }else{
                res.status(201).send({message : "No Post Found"})
            }
        } catch (error) {
            res.status(500).send("Server error");
        }
    }

    exports.updatePost = async (req,res)=>{
        try {
            const user = req.user;
            const {postId,title,caption,imageLink} = req.body;
            if(!postId){
                res.send({"message" : "postId is required"})
            }else{
                await postModel.findByIdAndUpdate(
                    { _id: postId},
                    {
                        title,
                        caption,
                        imageLink
                    }
                )
                res.send({"message" : "Update successfully"})
            }
        } catch (error) {
            res.status(500).send("Server error");
        }
    }

    exports.deletePost = async (req,res)=>{
        try {
            const {postId} = req.params;
            if(!postId)
                res.status(201).send({"message" : "postId is required"})
            else{
                await postModel.findByIdAndDelete({_id: postId})
                res.status(201).send({"message" : "Delete successfully"})
            }
        } catch (error) {
            res.status(500).send("Server error");
        }
    }

    exports.getPostByUserId = async (req,res)=>{
        try {
            const {userId} = req.params;
            if(!userId){
                res.status(201).send({"message" : "userId is required"})
            }else{
                const usersPost = await postModel.find({userId : userId})
                if(!usersPost)
                res.status(201).send({"message" : "No post available"})
                else
                res.status(200).send({
                    usersPost : usersPost
                })
            }
            
        } catch (error) {
            res.status(500).send("Server error");
        }
    }
 

 

  



