const { response } = require("express")
const jwt=require("jsonwebtoken")

const mid= function(req,res,next){
    try{
    const token=req.headers["x-api-key"]
 

    if(!token){
        return res.status(400).send({status:false,meassage:"token must be in the header"})
    }
    jwt.verify(
        token,
        "backendTaskWithSonu",
        (error, response) => {
            if (error) {
                return res.status(400).send({ status: false, msg: error.meassage });
            }

            req.userName=response.userName
         
           next()
        }
    )

}
catch(error){
 res.status(500).send({status:false,message:error.message})
}
}
module.exports=mid