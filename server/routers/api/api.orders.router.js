const router = require("express").Router()
const isAuthenticated = require("../../middlewares/isAuthenticated")
const isAdmin = require("../../middlewares/isAdmin")
const OrderController = require("../../controllers/order.controller")

// "/api/orders"
router.use(isAuthenticated)

router.get("/", isAdmin, OrderController.getAllOrders)

router.post("/", OrderController.generateOrder)

router.post("/:orderId", isAdmin, OrderController.sendOrder)

module.exports = router