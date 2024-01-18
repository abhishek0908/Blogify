const { SecretKey } = require("../config")
const {User} = require('../db/usersModel')
const jwt = require('jsonwebtoken')
const userMiddleWare = async(req,res,next)=>{
    try{
    const token = req.headers.authorization;
    if(!token) return res.status(404).send({msg:'Token Not Provided'})
    const decodedToken = jwt.verify(token,SecretKey)
    if(!decodedToken.email) return res.status(404).send({msg:'Token is Invalid'})
    // console.log(decodedToken)
    const user = await User.findOne({email: decodedToken.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.userId = user._id;
    next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).send('Invalid token');
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).send('Token expired');
        }
        res.status(500).send('Internal server error');
    }
}

module.exports= {
    userMiddleWare
}