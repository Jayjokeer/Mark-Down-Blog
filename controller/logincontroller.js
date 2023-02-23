const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const userDB={
    users:require('../userDB.json'),
    setUser:function(data){
        this.users= data
    }
}

//function to handle login
const loginUser=async(req,res,next)=>{
    //making the username and password equal to the request body
    const {username,pwd}= req.body;
    if(!username && !pwd) return res.json({message:"username and password needed"})
    const foundUser = userDB.users.find(person=>person.username===username)
    if(!foundUser){return res.send("user doesnt exist")}
    try{
        const match = await bcrypt.compare(pwd,foundUser.password)
        if(match){
        jwt.sign(foundUser,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'40s'},(err,token)=>{
            console.log({token})})  
            next()
                    
        }
        }catch(err){res.send(err)}
    
    
}
const  verifyToken = function(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader!="undefined"){
        const bearerToken= bearerHeader.split(" ")[1]
        req.token= bearerToken
        next()
    }else{
        res.sendStatus(403).json({message:"token verification failed"})
    }

}

module.exports= {loginUser,verifyToken}