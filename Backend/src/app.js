const express= require('express')
const cookieParser = require('cookie-parser')
const asyncHandler =  require('express-async-handler')
const authRouter = require('./routes/auth.routes')


const app = express()

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authRouter)


app.use((err,req,res,next)=>{
    console.log(err);

    return res.status(500).json({
        success:false,
        message:err.message || "Internal server error"
    })
})


module.exports = app