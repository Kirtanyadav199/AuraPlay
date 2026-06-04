require('dotenv').config()
const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb()

app.listen(3000,()=>{
    console.log("The server is running on Port 3000");
})

