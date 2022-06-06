const UserModel = require("../models/user")

module.exports = async (req, res, next) => {
    const isAdmin = await UserModel.isAdmin(req.user.email)

    if (!isAdmin) {
        return res.status(401).send({
            error: 401,
            description: `Method: ${req.method} not authorized.`,
        })
    }

    next()
}