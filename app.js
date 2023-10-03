// mongodb
const mogoose=require("mongoose")
mogoose.connect("mongodb://127.0.0.1:27017/admin_panel")

//express
const express=require("express")
const app=express()
app.listen(4000,()=>{
  console.log("server started at http://127.0.0.1:4000/ ")
})

//nocache
const nocache = require("nocache");
app.use(nocache());

// view engine
app.set('view engine', 'ejs')

// bodyParser
// const bodyParser=require("body-parser")
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))

// static file
app.use(express.static("public"));



//for user routes
const userRoute=require("./routes/userRoute")
app.use("/",userRoute)

// //for admin routes
const adminRoute=require("./routes/adminRoute")
app.use("/admin",adminRoute)