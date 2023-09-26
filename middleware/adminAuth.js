const isLogin = async (req, res, next) => {
    try {
        if (!req.session.user_id) {
            return res.redirect("/admin")
        }

        next()
    } catch (error) {
        console.log(error.message+"admin isLogin")
    }
}
const isLogout = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            return res.redirect("/admin/dashboard")
        }

        next()
    } catch (error) {
        console.log(error.message+"admin isLogout")
    }
}
module.exports = {
    isLogin,
    isLogout
}