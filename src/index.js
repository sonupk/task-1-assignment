const express=require("express");
const mongoose=require("mongoose")
const route=require("./routes/route")

const app=express();

app.use(express.json());
mongoose.connect("mongodb+srv://sonupk:1HivF6DXHWanVcYu@cluster0.vtjazgb.mongodb.net/Task1-DB", {
    useNewUrlParser: true
})
    .then(()=> console.log("mongodb is connect"))
    .catch((error)=>console.log(error.message))

app.use("/",route)

app.listen(3000,()=>{
console.log("Express app running on "+3000)
})