const express = require('express')
const {Blog,User}  = require('../db/index');
const { userMiddleWare } = require('../middleware/userMiddleWare');
const router = express.Router()
router.post('/addblog',userMiddleWare ,async(req,res)=>{
    console.log(req.body)
    try{
    const {title,description} = req.body;
    const author = req.userId._id;
    const user = await User.findById(author.valueOf());
    if(!user)return res.send({msg:'User is not found'})
    const blog = new Blog({
        title:title,
        content:description,
        author:author,
    })
    await blog.save()
    res.send({msg:"Blog Added Successfully"})
}
    catch (error) {
        if (error.name === 'ValidationError') {
            
          const validationErrors = {};
          for (const field in error.errors) {
            validationErrors[field] = error.errors[field].message;
          }
          res.status(400).json({ errors: validationErrors });
        } else {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})


// update post

router.put('/updateblog/:id',userMiddleWare,async(req,res,next)=>{
    try{
    const{title,content} = req.body;
    const {id} = req.params
    const blog = await Blog.findById(id);
    if(!blog) return res.send("Blog id is not correct")
    if (blog.author.toString() !== req.userId._id.toString()) {
        return next(new ErrorHandler({msg:"Unauthorized"}));
    }
    blog.title=title;
    blog.content=content;
    blog.updatedAt =Date.now()
    await blog.save()
   res.status(200).send({msg:"Blog Updated Successfully"})
}
catch(err){
    console.log(err);
    res.send({msg:"Internal Server Error"})
}
})


//GET My blogs 
router.get('/getmyblogs',userMiddleWare,async (req,res)=>{
    const id = req.userId._id.valueOf();
    const blogs  = await Blog.find({author:id})
    res.status(200).json(blogs)

})
//GET All blogs 
router.get('/getallblogs',async (req,res)=>{
    const blogs  = await Blog.find({})
    res.status(200).json(blogs)

})
//Delete blog 
router.delete('/deleteblog/:blog_id',userMiddleWare,async (req,res)=>{
    try{
    const {blog_id} = req.params;
    const blog = await Blog.findByIdAndDelete(blog_id);
    if(!blog) return res.send({msg:"Blog id not correct"})
    if (blog.author.toString() !== req.userId._id.toString()) {
        return next(new ErrorHandler("Unauthorized", 401));
    }
    return res.send({msg:"Blog Deleted Successfully"})

    }
    catch(err)
    {
        console.log(err)
        res.send("Internal Server Error")
    }


})

router.get('/getblog/:id',userMiddleWare,async(req,res)=>{
    console.log(req.params.id)
    try{
    const {id} = req.params;
    const blog  =await Blog.findById(id);
    if(!blog) return res.send("Blog id is not correct")
    
    res.status(200).json(blog);
}
catch(err)
{
    console.log(err)
        res.send({msg:"Internal Error"})
}
    
})

module.exports =router