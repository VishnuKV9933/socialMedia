const router =require("express").Router()

router.get("/",(req,res)=>{
    res.send("wel  admin    come")
})


module.exports = router