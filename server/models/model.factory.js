const cartModel = require('./cart.model')
const orderModel = require('./order.model')
const productModel = require('./product.model')
const userModel = require('./user.model')
const logger = require('../log')

// abstract factory --> clase que fabrica clases(modelos).
class ModelFactory {
  static getModel(modelName) { // al ser static no es parte de la instancia.
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

// En los otros modelos: lo importamos
// y const userModel = ModelFactory.getModel("users")

// Lo que hacemos acá es: Al retornar una unica instancia,
// usamos esa misma para todas las veces que lo llamamos,
// evitando asi instanciar la misma clase en cada
// archivo donde la llamamos. --> SINGLETON