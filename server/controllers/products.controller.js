const ModelFactory = require("../models/model.factory")
const logger = require('../log')

const productModel = ModelFactory.getModel("product")

const getAllProducts = async (req, res) => {
    const { orderBy, order, search } = req.query
    logger.info(`Order by: ${orderBy}, order: ${order}, search: ${search}`)

    try {
      const products = await productModel.getAllProducts(orderBy, order, search)
      res.status(200).send(products)
    } catch (error) {
      logger.error(error)
      res.status(500).send({ error: error.message })
    }
}

const getProductsByCategory = async (req, res) => {
    const { category } = req.params
    logger.info(`Requested category: ${category}`)

    try {
      const products = await productModel.getProductsByCategory(category)
      res.status(200).send(products)
    } catch (error) {
      logger.error(error)
      res.status(500).send({ error: error.message })
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const [data, status] = await productModel.getProduct(id)
        res.status(status).send(data)        
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const createProduct = async (req, res) => {
    const { body } = req
    logger.info(body)

    try {
        const [data, status] = await productModel.createProduct(body)
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
        const [data, status] = await productModel.updateProduct(id, body)
        res.status(status).send(data)       
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    
    try {
        const [data, status] = await productModel.deleteProduct(id)
        res.status(status).send(data)
    } catch (error) {
        logger.error(error)
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}