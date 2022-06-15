const logger = require('../log')

module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        logger.error("PASSPORT DENIED")
        return res.redirect("/login")
    }

    next()
}