// const { checkuser } = require("../Middlewares/AuthMiddlewares")
const {userPostS3Upload,getPosts,likeUnlike,getuser,addComment,getCommets,addReplyComment,getReplyCommets} =require("../Controllers/UserController")

const router =require("express").Router()

const {upload}=require('../otherFiles/multer')

router.post("/userpost",upload.single('image'),userPostS3Upload)
router.get("/getposts",getPosts)
router.post("/getuser",getuser)
router.put(`/like/:id/unlike`,likeUnlike)
router.put(`/addcomment`,addComment)
router.post ("/getcomments",getCommets)
router.put("/addreplycomments",addReplyComment)
router.get("/getreplycomments/:commetId",getReplyCommets)

 
module.exports = router 

 