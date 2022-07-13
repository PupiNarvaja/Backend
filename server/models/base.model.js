const { model } = require("mongoose")

class BaseModel {
    constructor(schema, modelName) {
        this.model = model(modelName, schema)
    }

    async getById(id) {
        return await this.model.findById(id)
    }
}

module.exports = BaseModel
// repostory pattern

// Probar const X = await super.save() --_> Mezclar basemodel con metodos del modelo user por ej.