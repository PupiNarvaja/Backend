const UserModel = require("../models/user")

module.exports = async (req, res, next) => {
    const isAdmin = await UserModel.isAdmin(req.user.email)

    if (!isAdmin) {
        return res.redirect("/unauthorized")
    }

    next()
}