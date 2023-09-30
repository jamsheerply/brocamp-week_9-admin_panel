

const isLogin = async (req, res, next) => {
    try {

        if (!req.session.user_id) {
            console.log("worked user auth")
            return res.redirect("/")
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

const isLogout = async (req, res, next) => {
    try {
        if (req.session.user_id && req.session.is_admin == 0) {
            return res.redirect("/home")
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    isLogin,
    isLogout
}