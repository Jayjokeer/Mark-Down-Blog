require('dotenv').config()
const express = require('express');
const PORT = 4000;
const mongoose=require('mongoose')
const ejs = require('ejs')
const path = require ('path')
const jwt =require('jsonwebtoken')
const bodyParser =require('body-parser');
const handlebars= require('handlebars');
const exphbs= require('express-handlebars')
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public','assets')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
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
app.use('/',require('./routes/router'))





app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})