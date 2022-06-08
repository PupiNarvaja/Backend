const { verifyToken } = require("../auth/jwt")

module.exports = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies.token) {
        console.log("There are no cookies!")
        return res.status(401).send({
            error: "Unauthorized. Not logged."
        })
    }

    const token = cookies.token

    if (!verifyToken(token)) {
        return res.status(401).send(`
            error: Unauthorized. Invalid token. <br>
            <a href="/login">Login</a>
        `)
    }
    console.log("Valid token!")

    next()
}

// const { verifyToken } = require("../auth/jwt")

// module.exports = (req, res, next) => {
//     const header = req.headers.cookie
    
//     // if (!header) {
//     //     console.log("Header: " + header)
//     //     return res.status(401).send({
//     //         error: "Unauthorized. Not logged."
//     //     })
//     // }
//     // console.log(header)
//     const token = header.replace("token=", "")
//     .replace(";", "")
//     .split(" ")[1]

//     console.log("Token: " + token)

//     if (!verifyToken(token)) {
//         return res.status(401).send({
//             error: "Unauthorized. Invalid token."
//         })
//     }

//     next()
// }

// -------------------------------------------

// const { verifyToken } = require("../auth/jwt")

// module.exports = (req, res, next) => {
//     const header = req.headers.authorization
    
//     if (!header) {
//         console.log("Header: " + header)
//         return res.status(401).send({
//             error: "Unauthorized. Not logged."
//         })
//     }

//     const token = header.split(" ")[1]

//     console.log("Token: " + token)

//     if (!verifyToken(token)) {
//         return res.status(401).send({
//             error: "Unauthorized. Invalid token."
//         })
//     }

//     next()
// }