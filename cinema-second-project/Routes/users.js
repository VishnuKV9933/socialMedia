// const { checkuser } = require("../Middlewares/AuthMiddlewares")
const {userPostS3Upload,getPosts,likeUnlike,getuser} =require("../Controllers/UserController")

const router =require("express").Router()

const {upload}=require('../otherFiles/multer')

router.post("/userpost",upload.single('image'),userPostS3Upload)
router.get("/getposts",getPosts)
router.post("/getuser",getuser)
router.put(`/like/:id/unlike`,likeUnlike)
 
module.exports = router 