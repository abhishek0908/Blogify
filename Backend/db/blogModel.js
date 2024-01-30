const { User } = require('./usersModel')
const mongoose = require('mongoose')
const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength : [100,'Title cannot exceed 100 characters'],
        minlength : [3,'Title cannot be less than 3 character']
    },
    content:{
        type:String,
        required:true,
        minlength : [100,'Content must be more than 100 character']
    },
    author : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now, // Use Date.now as the default value
      },
    updatedAt: {
        type: Date,
        default: Date.now, // Use Date.now as the default value
      },
})
const Blog = mongoose.model('Blog',BlogSchema)

module.exports={
    Blog,
}