const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const redis = require('../config/cache')


const authUser = async(req,res,next)=>{

     const token = req.cookies.token

     if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
     }

     const isTokenblacklisted = await redis.get(token)

     if(isTokenblacklisted){
        return res.status(401).json({
         message:"Invalid token"
        })
     }

     try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next()
     }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
     }
     
    

}


module.exports = {authUser}