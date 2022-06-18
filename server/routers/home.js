const router = require("express").Router()
const path = require("path")
const isAuthenticated = require("../middlewares/isAuthenticated");

//  /
router.get("/", isAuthenticated, (req, res) => {
    // const { firstname, lastname } = req.user
    // const user = `Welcome ${firstname} ${lastname} <br> <form action="/logout" method="POST"><button type="submit">Logout</button></form>`
    
    res.sendFile(path.join(__dirname, "../views/home.html"))
})

module.exports = router;