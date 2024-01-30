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
    res.send({msg: "Login Successfully ",
token:token})
})

router.post('/signup',async(req,res)=>{
    try{
    const {email,password,firstname,lastname} = req.body;

        const validateEmail = emailSchema.safeParse(email);
        const validatePassword = passwordSchema.safeParse(password);
        if(!validateEmail.success) return res.send({msg:"Email is not correct"})
        if(!validatePassword.success) return res.send({msg:"Password Must Contain min 8 letter and use atleast one number,one special character and one character"})
        const user = new User({
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname,
    })
    await user.save();
    res.send({msg:"Account created Successfully"})
}
catch(error)
{

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
        return res.status(400).json({ msg: 'Email address is already registered.' });
      }
    res.send({msg:"Something went wrong !Please try again after some time"})
}
})

router.put('/updateinfo',userMiddleWare,async(req,res)=>{
    const user_id = req.userId._id;
    const{firstname,lastname} = req.body;
    const data = await User.findById(user_id)
    res.send({msg:"Info Updated Successfully"})
    data.firstname=firstname
    data.lastname =lastname;
    await data.save()
})

router.get('/profile',userMiddleWare,async(req,res)=>{
        const userId = req.userId._id;
        const data   = await User.findById(userId.valueOf())
        res.send(data);
})


// Assuming you are using passport.js for authentication
router.post('/logout', (req, res) => {
    req.logout(); // Passport.js logout function
  
    // Instead of destroying the entire session, you might want to just remove the user property
    req.session.passport = null;
  
    res.sendStatus(200); // Send a success response
  });
  

module.exports = router;

