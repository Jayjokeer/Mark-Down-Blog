require('dotenv').config()
const express = require('express');
const PORT =process.env.PORT || 4000;
const mongoose=require('mongoose')
const ejs = require('ejs')
const path = require ('path')
const bodyParser =require('body-parser');
const methodOverride= require('method-override')
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
mongoose.connect('mongodb+srv://johntom:<Machinegun>@markdn.ixw0snt.mongodb.net/test/blog',{
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
app.use('/',require('./routes/router'))





app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})

