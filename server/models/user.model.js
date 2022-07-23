const { Schema } = require("mongoose")
const bcrypt = require("bcrypt")
const BaseModel = require("./base.model")

class UserModel extends BaseModel {
    constructor() {
        const schema = new Schema({
            email: String,
            firstname: String,
            lastname: String,
            password: String,
            age: Number,
            address: String,
            phone: Number,
            profile: String,
            admin: Boolean
        })

        super(schema, "users")
    }

    async getAllUsers() {
        const data = await this.model.find({}).lean()

        return data.map((user) => ({
            id: user._id.toString(),
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            phone: user.phone,
            address: user.address
        }))
    }

    async saveUser(obj) {
        obj.password = await bcrypt.hash(obj.password, 10)
        return await this.model.create(obj)
    }

    existsByEmail(email) {
        return this.model.exists({ email })
    }

    async getUserByEmail(email) {
        const user = await this.model.findOne({ email }).lean()
        return {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email
        }
    }

    async isPasswordValid(email, password) {
        const user = await this.model.findOne({ email }).lean()

        return await bcrypt.compare(password, user.password)
    }
    
    async isAdmin(email) {
        const user = await this.model.findOne({ email }).lean()
        return user.admin
    }
}

module.exports = new UserModel()