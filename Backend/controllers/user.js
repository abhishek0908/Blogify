const express = require('express')
const router = express.Router();
const {User} = require('../db/index')
const bycrpt = require('bcryptjs')
const {z} = require('zod')
const {SecretKey}  = require('../config')
const jwt = require('jsonwebtoken');
const {userMiddleWare} = require('../middleware/userMiddleWare')
// Define a schema for password validation
const passwordSchema = z
  .string()
  .min(8)
  .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).*$/);
  const emailSchema = z.string().email()


//Login to User
router.post('/signin',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({
        email:email,
    })
    if(!user) return res.send({msg:'Email is Wrong'})
    const isMatch = await bycrpt.compare(password,user.password);
    if(!isMatch) return res.send({msg:'Password is Wrong'})
    const token = jwt.sign({email},SecretKey);
    console.log(token)
    res.send("Login Successfully "+token)
})

router.post('/signup',async(req,res)=>{
    try{
    const {email,password,firstname,lastname} = req.body;

        const validateEmail = emailSchema.safeParse(email);
        const validatePassword = passwordSchema.safeParse(password);
        if(!validateEmail.success) return res.send("Email is not correct")
        if(!validatePassword.success) return res.send("Password Must Contain min 8 letter and use atleast one number,one special character and one character")
        const user = new User({
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname,
    })
    await user.save();
    res.send("Account created Successfully")
}
catch(err)
{
    console.log(err)
    res.send({msg:"Something went wrong !Please try again after some time"})
}
})

router.put('/updateinfo',userMiddleWare,async(req,res)=>{
    const{firstname,lastname,email} = req.body;
   await User.findOneAndUpdate({
        email:email,
        lastname:lastname,
        firstname:firstname
    })
    res.send({msg:"Info Updated Successfully"})
    
})


module.exports = router
