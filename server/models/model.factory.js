const cartModel = require('./cart.model')
const orderModel = require('./order.model')
const productModel = require('./product.model')
const userModel = require('./user.model')
const logger = require('../log')

class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case 'cart':
        return cartModel
      case 'order':
        return orderModel
      case 'product':
        return productModel
      case 'user':
        return userModel
      default:
        logger.error('Model does not exist.')
        throw new Error('Model does not exist.')
    }
  }
}

module.exports = ModelFactory