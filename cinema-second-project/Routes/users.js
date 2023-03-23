// const { checkuser } = require("../Middlewares/AuthMiddlewares")
const {userPostS3Upload,getPosts,likeUnlike} =require("../Controllers/UserController")

const router =require("express").Router()

const {upload}=require('../otherFiles/multer')

router.post("/userpost",upload.single('image'),userPostS3Upload)
router.get("/getposts",getPosts)
router.put(`/like/:id/unlike`,likeUnlike)
 
module.exports = router 