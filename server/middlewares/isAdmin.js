const ModelFactory = require("../models/model.factory")

const userModel = ModelFactory.getModel("user")

module.exports = async (req, res, next) => {
    const isAdmin = await userModel.isAdmin(req.user.email)

    if (!isAdmin) {
        return res.redirect("/unauthorized")
    }

    next()
}