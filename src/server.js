
const express = require('express')
const PORT = 4000;
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
mongoose.connect('mongodb+srv://johntom:machinegun@cluster0.0up53ms.mongodb.net/?retryWrites=true&w=majority',{
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

//database
/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://johntom:machinegun@cluster0.0up53ms.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("Blog").collection("devices");
  // perform actions on the collection object
  client.close();
  if(!err){
    console.log('connected')
  }
});*/

//routes
app.use('/',require('./routes/router'))





app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)})

