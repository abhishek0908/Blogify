const express = require('express')
const { userMiddleWare } = require('../middleware/userMiddleWare');
const { User, Blog } = require('../db');
const router = express.Router()

router.post('/addtofavorite/:blog_id',userMiddleWare,async(req,res)=>{
    try{    
    const {blog_id} = req.params;
        const user_id = req.userId._id;
        const blog = Blog.findById(blog_id);
        if(!blog) return res.send("Blog Id is Invalid")
        const user = await User.findByIdAndUpdate(user_id,
            {
              $addToSet: { favorite: { $each: [blog_id], $ne: blog_id } }
            
        });
        if(!user) return res.send("user_id not found Not Found")
        res.send("Idea Added to Favorite list")
    }
    catch(err)
    {
        console.log(err);
    }
})


//remove from fav list
router.put('/removefromlist/:blog_id',userMiddleWare,async(req,res)=>{
    try{
        console.log("Hello")
    
    const {blog_id} = req.params;
    const user_id = req.userId._id;
    const blog = await User.findByIdAndUpdate(user_id,{
        $pull : {favorite:{$in : [blog_id]}}
    })
    if(!blog) return res.send("user_id is not correct");
    res.send({msg:"Removed from favorite cart"})
}
catch(err)
{
    console.log(err)
    res.send("Some Internal Error")
}
})


router.get('/myfavoritelist',userMiddleWare,async(req,res)=>{
    const id = req.userId._id;
    const user = await User.findById(id);
    const list = user.favorite;
    res.json({list})
})

module.exports =
    router