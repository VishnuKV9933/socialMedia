const router =require("express").Router()

const {allUsers,blockUnblock,reportPost,getReportedPosts,getPost,hidePost} =require("../Controllers/AdminController")

router.get("/getuser",allUsers)

router.put("/userblockunblock/:id",blockUnblock)

router.post("/reportpost",reportPost)

router.get("/getreportedposts",getReportedPosts)

router.get("/getpost/:postId",getPost)

router.put("/hidepost/:id",hidePost)





module.exports = router