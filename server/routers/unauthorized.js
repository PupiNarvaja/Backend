const router = require("express").Router()
const path = require("path")

//  /unauthorized
router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"))
})

module.exports = router