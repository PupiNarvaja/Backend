const ModelFactory = require("../models/model.factory")
const logger = require('../log')

const productModel = ModelFactory.getModel("product")

const getAllProducts = async (req, res) => {
    const { orderBy, order, search } = req.query
    try {
      const products = await productModel.getAllProducts(orderBy, order, search)
      res.status(200).send(products)
    } catch (error) {
      logger.error(error)
      res.status(500).send({ error: error.message })
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.getProduct(id)
        const [data, status] = product
        res.status(status).send(data)        
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const createProduct = async (req, res) => {
    const { body } = req
    try {
        const newProd = await productModel.createProduct(body)
        const [data, status] = newProd
        res.status(status).send(data)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const updated = await productModel.updateProduct(id, body)
        const [data, status] = updated
        res.status(status).send(data)       
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    
    try {
        const deleted = await productModel.deleteProduct(id)
        const [data, status] = deleted
        res.status(status).send(data)  
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}