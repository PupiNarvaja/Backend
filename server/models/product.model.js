const { Schema, model } = require("mongoose")

class ProductModel {
    constructor() {
        const schema = new Schema({
            title: String,
            description: String,
            code: String,
            img: String,
            price: Number,
            category: String,
            stock: { type: Number, default: 0 },
            timestamp: { type: Number, default: Date.now(), format: '%Y-%m-%d' }
        })
        
        this.model = model("products", schema)
    }

    async getAllProducts(orderBy = "", order = -1, search = "") {
        let find = search ? { title: { $regex: search, $options: "i" } } : {}
        const sort = {}

        orderBy ? sort[orderBy] = order : {}
        return await this.model.find(find, {
            title: 1,
            description: 1,
            code: 1,
            category: 1,
            img: 1,
            price: 1,
            stock: 1,
            id: 1,
            timestamp: 1
        }).sort(sort)
    }

    async getProductsByCategory(category) {
        return await this.model.find({ category })
    }

    async getProduct(id) {
        let status, data;
        const NOT_FOUND = { error: 404, description: "Requested product does not exist." }

        if (id.length < 24) {
            status = 404
            data = NOT_FOUND
            return [data, status]
        }

        const prod = await this.model.findById(id)
        if (!prod) {
            status = 404
            data = NOT_FOUND
            return [data, status]
        }

        status = 200
        data = prod
        return [data, status]
    }

    async createProduct(prod) {
        let status, data;

        const productExists = await this.model.exists({ title: prod.title })
        if (productExists) {
            status = 409
            data = { status: 409, description: "Product already exists." }
            return [data, status]
        }

        status = 201
        data = await this.model.create(prod)
        return [data, status]
    }

    async updateProduct(id, newProd) {
        let status, data;

        const productExists = await this.model.exists({ _id: id })
        if (!productExists) {
            status = 404
            data = { error: 404, description: "Product does not exist." }
            return [data, status]
        }

        const product = await this.model.findByIdAndUpdate(id, newProd).setOptions({returnDocument: 'after'})

        data = product
        status = 201
        return [data, status]
    }

    async deleteProduct(id) {
        let data, status;

        const productExists = await this.model.exists({ _id: id })
        if (!productExists) {
            status = 404
            data = { status: 404, description: "Product does not exist." }
            return [data, status]
        }

        await this.model.findByIdAndDelete(id)
        
        status = 200
        data = { status: "Success!", description: "Product deleted successfully." }
        return [data, status]
    }
}

module.exports = new ProductModel()