const jwt = require("jsonwebtoken")
const SECRET = "jwtsecret"

module.exports = {
    generateToken: (user) => {
        return jwt.sign(user, SECRET, {
            expiresIn: "1800s"
        })
    },
    verifyToken: (token) => {
        try {
            jwt.verify(token, SECRET)
            return true
        } catch (error) {
            return false
        }   
    }
}