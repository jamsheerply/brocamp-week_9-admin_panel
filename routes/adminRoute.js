const express = require("express")
const admin_route = express()

const session = require("express-session")
const config = require("../config/config")
admin_route.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,

}))

const bodyParser = require("body-parser")
admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({ extended: true }))

admin_route.set("view engine", "ejs")
admin_route.set("views", "./views/admin")
const adminAuth = require("../middleware/adminAuth")

const adminController = require("../controller/adminController")
admin_route.get("/", adminAuth.isLogout, adminController.loadLogin)
admin_route.post("/", adminController.verifyLogin)
admin_route.get("/dashboard", adminAuth.isLogin, adminController.adminDashbord)
admin_route.get("/logout", adminAuth.isLogin, adminController.logout)
admin_route.get("/new-user",adminAuth.isLogin,adminController.newUserLoad)
admin_route.post("/new-user",adminController.addUser)
admin_route.get("/edit-user",adminAuth.isLogin,adminController.editUserLoad)
admin_route.post("/edit-user",adminController.updateUsers)
admin_route.get("/delete-user",adminController.deleteUser)
admin_route.get("/search",adminController.searchUser)
// admin_route.get("*", (req, res) => {
//     res.redirect("/")

module.exports = admin_route