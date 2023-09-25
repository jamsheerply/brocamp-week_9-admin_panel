const express = require("express")
const user_route = express()

const config = require('../config/config')
const session = require("express-session")
user_route.use(session({
    secret: config.sessionSecret,
    resave: false, // Set to false to prevent session resaving on every request
    saveUninitialized: false // Set to false to prevent uninitialized sessions from being saved

}))
const auth = require("../middleware/auth")

const bodyParser = require("body-parser")
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({ extended: true }))

const userController = require("../controller/userController")
user_route.get("/sign-up", auth.isLogout, userController.loadSignup)
user_route.post("/sign-up", userController.insertUser)
user_route.get("/", auth.isLogout, userController.loginLoad)
user_route.get("/login", auth.isLogout, userController.loginLoad)
user_route.post("/login", userController.verifyLogin)
user_route.get("/home", auth.isLogin, userController.loadHome)
user_route.get("/logout", auth.isLogin, userController.userLogout)
// user_route.get("*",auth.isLogin,(req,res)=>{
//     res.redirect("/")
// })
module.exports = user_route