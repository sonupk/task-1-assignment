const express=require("express");
const user=require("../controller/userController")
const mid=require("../mid/mid")
const router=express.Router()

router.get("/student",function(req,res){
    res.send("I am ashish")
})


router.post("/user/userCreate",user.createUser)
router.post("/user/userLogIn",user.logInUser)
router.post("/student/add",mid,user.addStudent)
module.exports=router




