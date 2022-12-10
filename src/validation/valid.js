const str=(st)=>{
    return /[A-Za-z]/.test(st)
}
const num=(n)=>{
    return /[0-9]/.test(n)
}
const email=(em)=>{
    return  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(em)
}
const pass=(pass)=>{
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass)
}



module.exports={str,num,email,pass}