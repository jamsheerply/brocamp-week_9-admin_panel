const express = require("express")
const admin_route = express()

const session = require("express-session")
const config = require("../config/config")
admin_route.use(session({
    secret: config.sessionSecret,
    resave: false, // Set to false to prevent session resaving on every request
    saveUninitialized: false, // Set to false to prevent uninitialized sessions from being saved

}))

const bodyParser = require("body-parser")
admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({ extended: true }))

admin_route.set("view engine", "ejs")
admin_route.set("views", "./views/admin")
const auth = require("../middleware/adminAuth")

const adminController = require("../controller/adminController")
admin_route.get("/", auth.isLogout, adminController.loadLogin)
admin_route.post("/", adminController.verifyLogin)
admin_route.get("/dashboard", auth.isLogin, adminController.adminDashbord)
admin_route.get("/logout", auth.isLogin, adminController.logout)
admin_route.get("/new-user",auth.isLogin,adminController.newUserLoad)
admin_route.post("/new-user",adminController.addUser)
// admin_route.get("*", (req, res) => {
//     res.redirect("/")

module.exports = admin_route