const { Schema } = require("mongoose")
const moment = require("moment")
const BaseModel = require("./base.model")

class OrderModel extends BaseModel {
    constructor() {
        const schema = new Schema({
            userId: String,
            email: String,
            total: { type: Number, default: 0 },
            created: { type: Date, default: Date.now },
            products: { type: Array, default: [] },
            sent: Boolean
        })

        super(schema, "orders")
    }

    async getAll() {
        const data = await this.model.find({}).lean()

        return data.map((order) => ({
            id:order._id.toString(),
            userId: order.userId,
            email: order.email,
            total: order.total,
            created: moment(order.created).format("DD-MM-YYYY HH:mm"),
            sent: order.sent ? "Yes" : "No"
        }))
    }

    async newOrder(orderObj, products, email) {
        return await this.model.create({
            ...orderObj,
            email: email,
            created: moment().format(),
            products: products,
            sent: false
        })
    }

    async updateSentOrder(id) {
        const order = await this.model.findById(id)

        order.sent = true

        await this.model.updateOne({ _id: id }, order)
    }
}

module.exports = new OrderModel()