const {User} = require('./usersModel')
const {Blog} = require('./blogModel')
const mongoose  = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Blogify')
    .then(() => {
        console.log("Connected with MongoDB");
    })
    .catch((error) => {
        console.log(error);
    });
module.exports={
    User,Blog
}