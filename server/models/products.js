const mongoose = require("mongoose")

class Products {
    constructor() {
        const schema = new mongoose.Schema({
            title: String,
            description: String,
            code: String,
            url: String,
            price: Number,
            stock: { type: Number, default: 0 },
            timestamp: { type: Number, default: Date.now(), format: '%Y-%m-%d' }
        })
        
        this.model = mongoose.model("products", schema)
    }

    async getAllProducts(orderBy = "", order = -1, search = "") {
        let find = search ? { title: { $regex: search, $options: "i" } } : {}
        const sort = {}

        orderBy ? sort[orderBy] = order : {}
        return await this.model.find(find, {
            title: 1,
            description: 1,
            code: 1,
            url: 1,
            price: 1,
            stock: 1,
            id: 1,
            timestamp: 1
        }).sort(sort)
        // Desde el front controlar que si no se encuentra nada con el search,
        // muestre mensaje de no se encontraron resultados.
    }

    async getProduct(id) {
        let status, data;
        
        const prod = await this.model.findById(id)
        if (!prod) {
            status = 404
            data = { error: 404, description: "Requested product does not exist." }
            return [data, status]
        }

        status = 200
        data = prod
        return [data, status]
    }

    async createProduct(prod) {
        let status, data;

        if (prod.title === "" || prod.description === "" || prod.code === "" || prod.img === "" || prod.price === "" || prod.stock === "") {
            status = 409
            data = { error: 409, description: "Empty fields." }
            return [data, status]
        }

        const productExists = await this.model.exists({ title: prod.title })
        if (productExists) {
            status = 409
            data = { error: 409, description: "Product already exists." }
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
            data = { error: 404, description: "Product does not exist." }
            return [data, status]
        }

        await this.model.findByIdAndDelete(id)
        
        status = 200
        data = { description: "Product deleted successfully." }
        return [data, status]
    }
}

module.exports = new Products()