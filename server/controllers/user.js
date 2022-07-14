const ModelFactory = require("../models/model.factory")
const logger = require('../log')

const userModel = ModelFactory.getModel("user")

const getUserInfo = async (req, res) => {
    const { id } = req.user

    try {
        const user = await userModel.getById(id)
        res.send(user)
    } catch (error) {
       logger.error(error)
       res.status(500).send({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers()
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