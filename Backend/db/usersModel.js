const mongoose = require('mongoose');
const bycrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true,
        unique : true       
    },
    password : {
        type:String,
        required :true,
    },
    favorite : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
        }]  
})

const applyPreSaveHook = (schema)=>{
    schema.pre('save',function(next){
        const user = this
        if (!user.isModified('password')) {
            return next();
        }
        bycrypt.genSalt(10,(err,salt)=>{
            if(err){
                return  next(err)
            }
            bycrypt.hash(user.password,salt,(err,hash)=>{
                if(err) return next(err)
                user.password=hash;
                next()
            })
        })
    })
}
applyPreSaveHook(UserSchema)
const User = mongoose.model('User',UserSchema)

module.exports = {
User
}