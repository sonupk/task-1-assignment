const mongoose=require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId
const sub=["math","hindi","english",]
const studentSchema=new mongoose.Schema({
    name:String,
    subject:{
        type:String,
        enum:sub
    },
    user:String,
    marks:Number,
    isDeleted:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

module.exports=mongoose.model("satudent",studentSchema)