const UserModel = require("../models/user")
const logger = require('../log')

const getUserInfo = async (req, res) => {
    const { id } = req.user

    try {
        const user = await UserModel.getById(id)
        res.send(user)
    } catch (error) {
       logger.error(error)
       res.status(500).send({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers()
        res.send(users)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getUserInfo,
    getAllUsers
}