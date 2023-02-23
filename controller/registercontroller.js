const path= require('path')
const bcrypt = require('bcrypt')
const fsPromises =require('fs').promises

//import mock database
const userDB={ 
    users:require('../userDB.json'),
    setuser: function(data){
        this.users= data
    }}
//function to create new user
const registerNewUser= async(req,res)=>{
    //authenticate user with bycrpt

    const {username,pwd,email}= req.body
    if(!username && !pwd && !email) return res.json({message:'Please fill in all the boxes'})
    //check for duplicates
    const duplicates = userDB.users.find(person=>person.username === username)
    if(duplicates)return res.send('username already exists')
    //now lets encrypt the password with bcrypt
    try{
        const hashedpwd = await bcrypt.hash(pwd,10)
        //add password and username to the newuser variable
        const newUser = {"username":username,"password":hashedpwd,"email":email}
        //add the old users plus new users to the database
        userDB.setuser([...userDB.users,newUser])
        //write the new user to a file
        await fsPromises.writeFile(path.join(__dirname,'userDB.json'),JSON.stringify(userDB.users))
        //display the users
        res.json({message:userDB.users})
    }catch(err){
        res.send(err)
    }
}
module.exports= registerNewUser;