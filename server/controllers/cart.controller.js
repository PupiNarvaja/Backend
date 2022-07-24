const ModelFactory = require("../models/model.factory")
const logger = require('../log')

const cartModel = ModelFactory.getModel("cart")

const addProduct = async (req, res) => {
    const { id } = req.user
    const { prodId } = req.params
    try {
        const product = await cartModel.addProduct(id, prodId)
        const [data, status] = product
        res.status(status).send(data)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const getCartProducts = async (req, res) => {
    const { id } = req.user

    try {
        const products = await cartModel.getCartProducts(id)
        const [data, status] = products
        res.status(status).send(data)
    } catch (error) {
       logger.error(error)
       res.status(500).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.user
    const { prodId } = req.params   
    try {
        const product = await cartModel.deleteProduct(id, prodId)
        const [data, status] = product
        res.status(status).send(data)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const deleteCart = async (req, res) => {
    const { id } = req.params
    try {
        const [data, status] = await cartModel.deleteCart(id)
        res.status(status).send(data)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const modifyQuantity = async (req, res) => {
    const { id } = req.user
    const { operation, prodId } = req.params

    try {
        const product = await cartModel.modifyQuantity(id, prodId, operation)
        const [data, status] = product
        res.status(status).send(data)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    addProduct,
    getCartProducts,
    deleteProduct,
    deleteCart,
    modifyQuantity,
}