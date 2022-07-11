const router = require("express").Router()
const UniversalController = require("../controllers/universal.controller")

//  "/unauthorized"
router.get("/", UniversalController.sendIndex) // It sends index.html file. (NOTE: as React js is being used, same index.html it's send for every page requested.)

module.exports = router