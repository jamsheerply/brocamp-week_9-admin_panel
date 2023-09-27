const User = require("../models/userModel")

//password hashing
const bcrypt = require("bcrypt")
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error)
    }
}

const loadSignup = async (req, res) => {
    try {
        res.render("sign-up")

    } catch (error) {
        res.send(error.message)
    }
}

const insertUser = async (req, res) => {
    const secpassword = await securePassword(req.body.password)
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: secpassword
        })
        const userData = await user.save()
        if (userData) {
            res.redirect("/login")
        } else {
            res.render("sign-up", { message: "failed and try agian or try to contact admin" })
        }

    } catch (error) {
        res.send(error.message)
    }
}

//login user
const loginLoad = async (req, res) => {

    try {
        res.render("login-page")
    } catch (error) {
        console.log(error.message)
    }
}

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const userData = await User.findOne({ email: email })
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password)
            if (passwordMatch) {
                if (userData.is_admin === 0) {
                    req.session.user_id = userData._id
                    res.redirect("/home")
                } else {
                    req.session.user_id = userData._id
                    res.redirect("/admin")
                }
            } else {
                res.render("login-page", { message: "Email and password is incorrect-1" })
            }
        } else {
            res.render("login-page", { message: "Email and password is incorrect-2" })
        }
    } catch (error) {
        console.log(error.message)
    }
}
const loadHome = async (req, res) => {
    try {

        res.render("home")
    } catch (error) {
        console.log(error.message)
    }
}

const userLogout = async (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/")

    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    loadSignup,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
}