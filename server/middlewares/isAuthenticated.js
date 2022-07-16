const { verifyToken } = require("../auth/jwt")
const logger = require('../log')

module.exports = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies.token) {
        logger.error("There is no token!")
        return res.redirect("/login")
    }

    const token = cookies.token

    if (!verifyToken(token)) {
        return res.redirect("/login")
    }
    logger.info("Valid token!")

    next()
}


// const { verifyToken } = require("../auth/jwt")
// const logger = require('../log')

// module.exports = (req, res, next) => {
//     const header = req.headers.authorization
    
//     if (!header) {
//         logger.error("There's no authorization token.")
//         return res.send({ Error: "error" })
//         //return res.redirect("/login")
//     }
//     logger.info("Header: " + header)
//     const token = header.split(" ")[1]

//     // logger.info("Token: "+ token)
//     if (!verifyToken(token)) {
//        logger.error("The token does not match. ") //  + token
//         return res.redirect("/login")
//     }
    
//     logger.info("Valid token!")
//     next()
// }