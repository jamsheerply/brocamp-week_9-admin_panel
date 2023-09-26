const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const loadLogin = async (req, res) => {
    try {
        res.render("loginAdmin")
    } catch (error) {
        console.log(error.message+"admin loadLogin")
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
                    res.render("loginAdmin", { message: "Email and password is incorrect" })
                } else {
                    req.session.user_id= userData._id
                    res.redirect("/admin/dashboard")
                }
            } else {
                res.render("loginAdmin", { message: "Email and password is incorrect" })
            }
        } else {
            res.render("loginAdmin", { message: "Email and password is incorrect" })
        }
    } catch (error) {
        console.log(error.message+"admin verifyLogin")
    }
}

const logout=async (req,res)=>{
    try {
        req.session.destroy();
        res.redirect("/admin")
        
    } catch (error) {
        console.log(error.message+"admin logout")
    }
}

const adminDashbord= async (req,res)=>{
    try {
       const usersData=await User.find({is_admin:0})
        res.render("adminPanel",{user:usersData})
    } catch (error) {
     console.log(error.message+"adminDashbord")   
    }
}
//add new user
const newUserLoad=async(req,res)=>{
    try {
        res.render("newUser")
    } catch (error) {
        console.log(error.message)
    }
}

//password hashing
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash
    } catch (error) {
        console.log(error)
    }
}

const addUser=async (req,res)=>{
    const spassword = await securePassword(req.body.password)
    try {
        const username=req.body.username
        const email=req.body.email
        const password=spassword
        const user=new User({
            username:username,
            email:email,
            password:spassword
        })
        const userData =await user.save();
        if (userData) {
            res.redirect("/admin/dashboard")
        } else {
            res.render("sign-up", { message: "failed and try agian" })
        }
        
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    loadLogin,
    verifyLogin,
    adminDashbord,
    logout,
    newUserLoad,
    addUser

}