const router = require("express").Router()
const path = require("path")
const isAuthenticated = require("../middlewares/isAuthenticated")

//  /
router.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"))
})

module.exports = router;