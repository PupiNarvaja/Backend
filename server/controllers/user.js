const UserModel = require("../models/user")
const logger = require('../log')

const getUser = async (req, res) => {
    const { id } = req.user

    try {
        const user = await UserModel.getUserById(id)
        res.send(user)
    } catch (error) {
       logger.error(error)
       res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getUser
}