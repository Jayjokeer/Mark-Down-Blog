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
    res.render('new',{article:new ArticleDB()})
})
router.get('/articles/:slug',async (req,res)=>{//this is the show page get route by id after inputing the articles req.body
    const article= await ArticleDB.findOne({slug:req.params.slug});
    if(article== null)
        res.redirect('/articles')
    res.render('show',{article:article})}
    
)
router.get('/articles/edit/:id',async(req,res)=>{//route for the edit page
    const articles = await ArticleDB.findById(req.params.id)
    res.render('edit',{article:articles})
})
router.put('/articles/edit/:id',async(req,res,next)=>{
    req.article = await ArticleDB.findById(req.params.id)
    next()
},replaceArticle('edit'))//route for the edit page
    
router.post('/articles/new',async(req,res,next)=>{
    req.article= new ArticleDB()
    next()
},replaceArticle('new'))

router.delete('/articles/:id',async(req,res)=>{
    await ArticleDB.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})

function replaceArticle(path){// function to add edited article to the databse and send the you to the homepage
    return async(req,res)=>{
        let article = req.article
        article.title= req.body.title
        article.markdown= req.body.markdown
        article.description = req.body.description
        try{
           article= await article.save()
           res.redirect(`/articles/${article.slug}`)
        }catch(err){
                console.log(err)
                res.render(`/articles/${path}`,{article:article})
        }
    }
}
module.exports= router;