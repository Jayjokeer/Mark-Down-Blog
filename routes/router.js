const express = require ('express')
const router = express.Router()
const {loginUser,verifyToken} = require('../controller/logincontroller')
const registerNewUser= require('../controller/registercontroller')
const jwt = require ('jsonwebtoken')
const ArticleDB =require('../model/users')



//routes
//route to create a new user
router.post('/register',registerNewUser,(req,res)=>{
    res.redirect('/articles')
})
//sends the registration page
router.get('/register',(req,res)=>{
    res.render('base')
})

//posting the login info and displaying the dashboard page after logging in

router.post('/login',loginUser,(req,res,)=>{
    if(loginUser){
        res.redirect('/dashboard')
    }else{
        res.redirect('/404')
    }
})
//login page
router.get('/',(req,res)=>{
    res.render('base',{title:"login system"});
})

//protected route
router.post('/post',verifyToken,(req,res)=>{
    jwt.verify(req.token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
        if(err){
             res.sendStatus(403)}
        else{res.json({message:"post created",data})}
    })
    
})
//homepage with login


//404
router.get('/404',(req,res)=>{
    res.render('404')
})
//logout
router.get('/logout',(req,res)=>{
    res.redirect('/')
})


//homepage routes gangan
router.get('/articles',async(req,res)=>{//this is the homepage get route
    const article = await ArticleDB.find().sort({createdAt:'desc'})//this queries the datebase for all the articles and sorst them by descending order 
    res.render('home',{article:article})});

 
router.get('/articles/new',(req,res)=>{//route to get the new page
    res.render('new',{aarticle:new ArticleDB()})
})
router.get('/articles/:slug',async (req,res)=>{//this is the show page get route by id after inputing the articles req.body
    const article= await ArticleDB.findOne({slug:req.params.slug});
    if(article== null)
        res.redirect('/articles')
    res.render('show',{article:article})}
    
)
router.get('/articles/edit',(req,res)=>{//route for the edit page
    res.send(ArticleDB.slug)
})
router.post('/articles/new',async(req,res)=>{
    let aarticle= new ArticleDB({
        title: req.body.title,
        description:req.body.description,
        markdown:req.body.markdown,
    })
    try{
        await aarticle.save(); 
        res.redirect(`/articles/${aarticle.slug}`)
        console.log(aarticle)
    }catch(err){
        console.log(err)
        res.render('new',{aarticle:aarticle})
    }
})
router.delete('/:id',async(req,res)=>{
    const article= await ArticleDB.fndBy(req.params.id)
    res.redirect('/articles')
})

module.exports= router;