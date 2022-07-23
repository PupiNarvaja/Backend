const router = require("express").Router()
const UniversalController = require("../controllers/universal.controller")

//  "*"
router.get("*", UniversalController.sendIndex)

module.exports = router