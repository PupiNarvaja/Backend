const { Schema, model } = require("mongoose")
const moment = require("moment")

class OrderModel {
    constructor() {
        const schema = new Schema({
            userId: String,
            total: { type: Number, default: 0 },
            created: { type: Date, default: Date.now },
            products: { type: Array, default: [] },
            sent: Boolean
        })

        this.model = model("orders", schema)
    }

    async getAll() {
        const data = await this.model.find({}).lean()

        return data.map((order) => ({
            id:order._id.toString(),
            userId: order.userId,
            total: order.total,
            created: moment(order.created).format("DD-MM-YYYY HH:mm"),
            sent: order.sent ? "Yes" : "No"
        }))
    }

    async newOrder(orderObj, products) {
        const order = await this.model.create({
            ...orderObj,
            created: moment().format("DD-MM-YYYY HH:mm"),
            products: products
        })

        return {
            ...order, // Es necesario que retorne algo?
            sent: order.sent ? "Yes" : "No"
        }
    }
}

module.exports = new OrderModel()