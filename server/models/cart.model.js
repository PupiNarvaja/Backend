const { Schema, model } = require("mongoose")
const ProductsModel = require("./product.model");

class CartModel {
    constructor() {
        const schema = new Schema({
            userId: String,
            products: { type: Array, default: [] },
            timestamp: {
                type: Date,
                default: Date.now(this.timestamp).toString(),
                format: '%Y-%m-%d',
            }
        })
        
        this.model = model("carts", schema)
    }

    async createCart(userId) {
        return await this.model.create({ userId: userId })
    }

    async addProduct(id, idProd) {
        const cart = await this.model.findOne({ userId: id }).lean()

        const [product, status] = await ProductsModel.getProduct(idProd)

        const newProduct = {
            id: idProd,
            quantity: 1,
            title: product.title,
            img: product.img,
            description: product.description,
            price: product.price,
            code: product.code,
            category: product.category,
            timestamp: product.timestamp
        }

        if (cart === null) {
            let status = 404
            let data = { status: 404, description: "Requested cart does not exist." }
            return [data, status]
        }

        const prodInCart = cart.products.findIndex(prod => prod.id == idProd)
        if (prodInCart !== -1) {
            cart.products[prodInCart].quantity += 1
            await this.model.updateOne({ userId: id }, cart)
            let status = 201
            let data = { status: "Success!", description: `One unit added. Total units of ${product.title} are: ${cart.products[prodInCart].quantity}.` }
            return [data, status]
        }

        if (status === 404) {
            let data = { status: 404, description: "Requested product does not exist." }
            return [data, status]
        }

        cart.products.push(newProduct)
        await this.model.updateOne({ userId: id }, cart)
        let data = { status: "Success!", description: `${product.title} added successfully.` }
        return [data, 201]
    }

    async getCartProducts(userId) {
        let data, status;

        const cart = await this.model.findOne({ userId: userId }).lean()
        if (cart === null) {
            status = 404
            data = { status: 404, description: "Requested cart does not exist." }
            return [data, status]
        }

        status = 200
        data = cart.products

        return [data, status]
    }

    async emptyCart(userId) {
        const cart = await this.model.findOne({ userId }).lean()
        cart.products = []
        await this.model.updateOne({ userId: userId }, cart)
    }

    async deleteProduct(id, prodId) {
        let data, status;

        const cart = await this.model.findOne({ userId: id }).lean()
        const prodIndex = cart.products.findIndex(prod => prod.id == prodId)

        if (prodIndex === -1) {
            status = 404
            data = { status: 404, description: "Product not found." }
            return [data, status]
        }
        
        cart.products = cart.products.filter(prod => prod.id != prodId)
        await this.model.updateOne({ userId: id }, cart)

        status = 200
        data = { status: "Success!", description: "Product deleted." }
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
        data = { status: "Success!", description: "Cart deleted." }
        return [data, status]
    }

    async modifyQuantity(id, prodId, operation) {
        let data, status;

        const cart = await this.model.findOne({ userId: id }).lean()
        const prodIndex = cart.products.findIndex(prod => prod.id == prodId)

        if (prodIndex === -1) {
            status = 404
            data = { status: 404, description: "Product not found." }
            return [data, status]
        }

        const [product] = await ProductsModel.getProduct(prodId)

        if (operation === "addition") {
            cart.products[prodIndex].quantity += 1
            await this.model.updateOne({ userId: id }, cart)

            let status = 201
            let data = { status: "Success!", description: `One unit added. Total units of ${product.title} are: ${cart.products[prodIndex].quantity}.` }
            return [data, status]
        }

        if (operation === "subtraction") {
            cart.products[prodIndex].quantity -= 1
            await this.model.updateOne({ userId: id }, cart)
            
            let status = 201
            let data = { status: "Success!", description: `One unit subtracted. Total units of ${product.title} are: ${cart.products[prodIndex].quantity}.` }
            return [data, status]
        }
    }
}

module.exports = new CartModel()