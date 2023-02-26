require('dotenv').config()
const express = require('express');
const PORT =process.env.PORT || 4000;
const mongoose=require('mongoose')
const ejs = require('ejs')
const path = require ('path')
const bodyParser =require('body-parser');
const methodOverride= require('method-override')
const serverless = require('serverless-http')
 //midlewares
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(methodOverride('_method'))

//databse connection
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/blog',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},
    err=>{
        if(!err){
            console.log('connected')
        }else{
            console.log(`${err}`)
        }
    }
    )
    
//routes
app.use('/.netlify/functions/server',require('../src/routes/router'))





//app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})

module.exports.handler = serverless(app)