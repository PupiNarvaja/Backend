const path = require("path")
const logger = require('../log')

const logout = (req, res, next) => {
    res.clearCookie("token")
    
    req.logOut((err) => {
        if (err) {
            logger.error(err)
            return next(err)
        }
        res.status(200).sendFile(path.resolve(__dirname, "../../client/dist", "index.html"))
    })
}

module.exports = {
    logout
}