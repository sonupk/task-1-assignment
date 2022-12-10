const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    userName:String,
    password:String
},
{
    timestamps:true
})

module.exports=mongoose.model("user",userSchema)