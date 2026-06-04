const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler  = require('express-async-handler')
const blacklistModel = require('../models/blacklist.model')
const redis = require('../config/cache')



const registerUser  = asyncHandler(async(req,res)=>{
      const {username,email,password} = req.body;

      const isAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
      })

      if(isAlreadyExists){
        return res.status(409).json({
             message:"user with this"+(isAlreadyExists.email == email ? "Email already exists":"Username already exists")
        })
      }

      const hash = await bcrypt.hash(password,10)

      const user = await userModel.create({
        username,
        email,
        password:hash,
      })

      const token = jwt.sign({
        id:user._id,
        username:user.username
      },process.env.JWT_SECRET,
      {
        expiresIn:"3d"
      }
    )

    res.cookie("token",token)

    return res.status(200).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username
        }
    })
})

const loginUser = asyncHandler(async(req,res)=>{
  const {username,email,password} = req.body

  const user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  }).select("+password")

  
     if(!user){
      return res.status(400).json({
        message:"Invalid credentials"
      })
     }
    

     const isPasswordValid = await bcrypt.compare(password,user.password)
     console.log("Password valid:", isPasswordValid);

     if(!isPasswordValid){
      return res.status(400).json({
        message:"Invalid credentials"
      })
     }

     const token = jwt.sign(
      {
      id:user._id,
      username:user.username
     },
     process.env.JWT_SECRET,
     {
      expiresIn:"3d"
     }
    )

    res.cookie("token",token)

    return res.status(200).json({
      message:"User logged in successfully",
      user:{
        id:user._id,
        username:user.username,
        email:user.email
      }
    })
})

const getMe = asyncHandler(async (req,res)=>{
      const userId = req.user.id

      const user = await userModel.findById(userId).select("-password")

      res.status(200).json({
        message:"User fetched successfully",
        user
      })

})

const logoutUser = asyncHandler(async(req,res)=>{
  const token = req.cookies.token

  res.clearCookie("token")

  redis.set(token,Date.now().toString(),"EX",60*60)

  res.status(200).json({
    message:"Logout successfully"
  })
})




module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}