const express=require("express");
const user=require("../controller/userController")
const mid=require("../mid/mid")
const router=express.Router()


router.all("/*", (req, res) => 
{ res.status(400).send({ status: false, message: "Endpoint is not correct plese provide a proper end-point" }) })


router.post("/user/userCreate",user.createUser)
router.post("/user/userLogIn",user.logInUser)
router.post("/student/add",mid,user.addStudent)
router.put("/student/edit",mid,user.EditStudent)
router.get("/student/viewList",mid,user.viewData)
router.delete("/student/delete",mid,user.deleteStudent)
module.exports=router




