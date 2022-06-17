const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

class UserModel {
    constructor() {
        const schema = new Schema({
            email: String,
            firstname: String,
            lastname: String,
            password: String,
            age: String,
            address: String,
            phone: String
        })

        this.model = model("users", schema)
    }

    async saveUser(obj) {
        obj.password = await bcrypt.hash(obj.password, 10)
        return await this.model.create(obj)
    }

    existsByEmail(email) {
        return this.model.exists({ email })
    }

    async getUserById(id) {
        return await this.model.findById(id)
    }

    async getUserByEmail(email) {
        const user = await this.model.findOne({ email })
        return {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email
        }
    }

    async isPasswordValid(email, password) {
        const user = await this.model.findOne({ email })

        return await bcrypt.compare(password, user.password)
    }
    
    async isAdmin(email) {
        const user = await this.model.findOne({ email })
        return user.admin
    }
}

module.exports = new UserModel()