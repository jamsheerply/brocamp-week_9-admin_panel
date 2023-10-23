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
        // Check if the email already exists in the database
        const emailToFind = req.body.email.toLowerCase();
        const emailExists = await User.findOne({ email: emailToFind });
        
        if (emailExists) {
            res.render("sign-up", { message: "Email already exists. Please use a different email." });
        } else if (req.body.username.trim() === "") {
            res.render("sign-up", { message: "Please fill in a username." });
        } else {
            const user = new User({
                username: req.body.username,
                email: req.body.email.toLowerCase(),
                password: secpassword
            });

            const userData = await user.save();
            if (userData) {
                res.redirect("/login/");
            } else {
                res.render("sign-up", { message: "Failed to create the user. Please try again or contact the admin." });
            }
        }
    } catch (error) {
        res.send(error.message);
    }
}


//login user
const loginLoad = async (req, res) => {

    try {
        if (req.session.is_admin === 1) {
            res.redirect('/admin/dashboard')
        } else {
            res.render("login-page")
        }
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
                if (userData.is_admin === 1) {
                    res.render("login-page", { message: "Email and password is incorrect" })
                } else {
                req.session.user_id = userData._id
                req.session.is_admin = userData.is_admin
                res.redirect("/home")
                }
            } else {
                res.render("login-page", { message: "Email and password is incorrect" })
            }
        } else {
            res.render("login-page", { message: "Email and password is incorrect" })
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