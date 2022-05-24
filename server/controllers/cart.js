const Cart = require("../models/cart")

const createCart = async (req, res) => {
    try {
        const cart = await Cart.createCart()
        res.status(201).send(cart)        
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message })
    }
}

const addProduct = async (req, res) => {
    const { id, prodId } = req.params
    try {
        const product = await Cart.addProduct(id, prodId)
        const [data, status] = product
        res.status(status).send(data)
    } catch(e) {
        console.log(e)
        res.status(500).send({ error: error.message })
    }
}

const getCartProducts = async (req, res) => {
    const { id } = req.params
    try {
        const products = await Cart.getCartProducts(id)
        const [data, status] = products
        res.status(status).send(data)        
    } catch (error) {
       console.error(error)
       res.status(500).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id, prod } = req.params    
    try {
        const product = await Cart.deleteProduct(id, prod)
        const [data, status] = product
        res.status(status).send(data)        
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message })
    }
}

const deleteCart = async (req, res) => {
    const { id } = req.params
    try {
        const cart = await Cart.deleteCart(id)
        const [data, status] = cart
        res.status(status).send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    createCart,
    addProduct,
    getCartProducts,
    deleteProduct,
    deleteCart
}