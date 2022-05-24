const mongoose = require("mongoose")
const ProductsModel = require("../models/products");

class Cart {
    constructor() {
        const schema = new mongoose.Schema({
            products: { type: Array, default: [] },
            timestamp: {
                type: Date,
                default: Date.now(this.timestamp).toString(),
                format: '%Y-%m-%d',
            },
        })
        
        this.model = mongoose.model("carts", schema)
    }

    async createCart() {
        const cart = await this.model.create({})
        return cart
    }

    async addProduct(id, idProd) {
        const cart = await this.model.findById(id)
        const [product, status] = await ProductsModel.getProduct(idProd)

        const newProduct = {
            id: idProd,
            quantity: 1,
            title: product.title,
            description: product.description,
            price: product.price,
            code: product.code,
            timestamp: product.timestamp
        }

        if (cart === null) {
            let status = 404
            let data = { error: 404, description: "Requested cart does not exist." }
            return [data, status]
        }

        const prodInCart = cart.products.findIndex(prod => prod.id == idProd)
        if (prodInCart !== -1) {
            cart.products[prodInCart].quantity += 1
            await this.model.updateOne({ _id: id }, cart)
            let status = 201
            let data = { description: `One unit added. Total units of ${product.title} are: ${cart.products[prodInCart].quantity}.` }
            return [data, status]
        }

        if (status === 404) {
            let data = { error: 404, description: "Requested product does not exist." }
            return [data, status]
        }

        cart.products.push(newProduct)
        await this.model.updateOne({ _id: id }, cart)
        let data = { status: "success", description: `${product.title} added successfully.` }
        return [data, 201]
    }

    async getCartProducts(id) {
        let data, status;

        const cart = await this.model.findById(id)
        if (cart === null) {
            status = 404
            data = { error: "Requested cart does not exist." }
            return [data, status]
        }

        status = 200
        data = cart.products

        return [data, status]
    }

    async deleteProduct(id, idProd) {
        let data, status;

        const cart = await this.model.findById(id)
        const prodIndex = cart.products.findIndex(prod => prod.id == idProd)

        if (prodIndex === -1) {
            status = 404
            data = { error: -1, description: "Product not found." }
            return [data, status]
        }
        
        cart.products = cart.products.filter(prod => prod.id != idProd)
        await this.model.updateOne({ _id: id }, cart)

        status = 200
        data = { status: "success", description: "Product deleted." }
        return [data, status]
    }

    async deleteCart(id) {
        let data, status;

        const cart = await this.model.findById(id)

        if (cart === null) {
            status = 404
            data = { status: "Error", description: "Cart does not exist." }
            return [data, status]
        }
        await this.model.findByIdAndDelete(id)
        status = 202
        data = { status: "success", description: "Cart deleted." }
        return [data, status]
    }
}

module.exports = new Cart()