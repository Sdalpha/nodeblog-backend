const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const authentication = require("../middleware/authentication")


router.post("/register", userController.userRegistration)
router.post("/login", userController.userLogin)
router.post("/createPost",authentication, userController.createPost)
router.put("/updatePost", authentication, userController.updatePost)
router.delete("/deletePost/:postId", authentication, userController.deletePost)
router.get("/getAllPost", userController.getAllPost)
router.get("/getPostByUserId/:userId", userController.getPostByUserId)

module.exports = router;




