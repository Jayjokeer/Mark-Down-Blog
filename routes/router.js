const express = require ('express')
const router = express.Router()
const ArticleDB =require('../model/users')



//homepage routes gangan
router.get('/articles',async(req,res)=>{//this is the homepage get route to the homepage
    const article = await ArticleDB.find().sort({createdAt:'desc'})//this queries the datebase for all the articles and sorst them by descending order 
    res.render('home',{article:article})});

//new article page
router.get('/articles/new',(req,res)=>{//route to get the new article page 
    res.render('new',{article:new ArticleDB()})
})

//show page 
router.get('/articles/:slug',async (req,res)=>{//this is the show page get route by id after inputing the articles req.body
    const article= await ArticleDB.findOne({slug:req.params.slug});
    if(article== null)
        res.redirect('/articles')
    res.render('show',{article:article})}
);
//edit page
router.get('/articles/edit/:id',async(req,res)=>{//route show the edit page
    const articles = await ArticleDB.findById(req.params.id)//query the database for articles matching the same id
    res.render('edit',{article:articles})
})

//adding the newly edited article to the database
router.put('/articles/edit/:id',async(req,res,next)=>{
    req.article = await ArticleDB.findById(req.params.id)
    next()
},replaceArticle('edit'))

//post route to add the new article to the database
router.post('/articles/new',async(req,res,next)=>{
    req.article= new ArticleDB()
    next()
},replaceArticle('new'))

//deleting the article using the id
router.delete('/articles/:id',async(req,res)=>{
    await ArticleDB.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})

function replaceArticle(path){// function to add edited and new article to the database and send the you to the homepage
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