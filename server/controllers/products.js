const Product = require("../model/products")

const isAdmin = false

const getAllProducts = (req, res) => {
    res.send(Product.getAllProducts())
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        res.status(200).send(await Product.getProduct(id))        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const addProduct = async (req, res) => {
    try {
        const { body } = req
        isAdmin
          ? res.status(201).send(await Product.addProduct(body))
          : res.status(500).send({ error: -1, description: "Access denied." });
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        isAdmin
          ? res.status(201).send(await Product.updateProduct(id, body))
          : res.status(500).send({ error: -1, description: "Access denied." });        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        isAdmin
          ? res.status(200).send(await Product.deleteProduct(id))
          : res.status(500).send({ error: -1, description: "Access denied." });        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}