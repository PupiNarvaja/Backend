const { verifyToken } = require("../auth/jwt")
const path = require("path")
const logger = require('../log')

module.exports = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies.token) {
        logger.error("There is no token!")
        return res.status(401).sendFile(path.join(__dirname, "../views/notLogged.html"))
    }

    const token = cookies.token

    if (!verifyToken(token)) {
        return res.status(401).sendFile(path.join(__dirname, "../views/notLogged.html"))
    }
    logger.info("Valid token!")

    next()
}

// -------------------------------------------

// const { verifyToken } = require("../auth/jwt")

// module.exports = (req, res, next) => {
//     const header = req.headers.authorization
    
//     if (!header) {
//         logger.info("Header: " + header)
//         return res.status(401).send({
//             error: "Unauthorized. Not logged."
//         })
//     }

//     const token = header.split(" ")[1]

//     logger.info("Token: " + token)

//     if (!verifyToken(token)) {
//         return res.status(401).send({
//             error: "Unauthorized. Invalid token."
//         })
//     }

//     next()
// }