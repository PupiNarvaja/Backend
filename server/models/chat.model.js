const { Schema, model } = require("mongoose")

class ChatModel {
    constructor() {
        const schema = new Schema({
            email: String,
            type: String,
            body: String,
            timestamp: { type: Number, default: Date.now(), format: '%Y-%m-%d' }
        })
        
        this.model = model("messages", schema)
    }

    async saveMessage(msg) {
        this.model.create({
            email: "NOT YET",
            type: "NOT YET",
            body: msg
        })
    }

    async findMessage() {
        return this.model.find({})
    }
}

module.exports = new ChatModel()