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
        await this.model.create({
            ...orderObj,
            created: moment().format("DD-MM-YYYY HH:mm"),
            products: products,
            sent: false
        })
    }

    async updateSentOrder(id) {
        const order = await this.model.findById(id)

        order.sent = true

        await this.model.updateOne({ _id: id }, order)
    }

    async findOrderById(orderId) {
        const order = this.model.findById(orderId)
        return order
    }
}

module.exports = new OrderModel()