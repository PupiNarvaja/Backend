const CartModel = require("../models/cart")
const logger = require('../log')

// const createCart = async (req, res) => {
//     try {
//         const cart = await CartModel.createCart()
//         res.status(201).send(cart)        
//     } catch (error) {
//         logger.error(error)
//         res.status(500).send({ error: error.message })
//     }
// }

const addProduct = async (req, res) => {
    const { id } = req.user
    const { prodId } = req.params
    try {
        const product = await CartModel.addProduct(id, prodId)
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
        const products = await CartModel.getCartProducts(id)
        const [data, status] = products
        res.status(status).send(data)
    } catch (error) {
       logger.error(error)
       res.status(500).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id, prod } = req.params    
    try {
        const product = await CartModel.deleteProduct(id, prod)
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
        const cart = await CartModel.deleteCart(id)
        const [data, status] = cart
        res.status(status).send(data)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    // createCart,
    addProduct,
    getCartProducts,
    deleteProduct,
    deleteCart
}