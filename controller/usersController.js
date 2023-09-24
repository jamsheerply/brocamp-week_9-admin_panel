const User = require("../models/usersModel")

const insertUser = async (req, res) => {
    try {
        const user=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        const result=await user.save()
        res.send("sucessfull"+result)

    } catch (error) {
        res.send(error.message)
    }
}

module.exports={
    insertUser
}