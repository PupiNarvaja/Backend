const router = require("express").Router()
const cartController = require("../../controllers/cart.controller")
const isAuthenticated = require("../../middlewares/isAuthenticated")

//  "/api/cart"
router.use(isAuthenticated)

router.get("/", cartController.getCartProducts) // Get all products from a specific cart.

router.post("/:prodId", cartController.addProduct) // Add a specific product to a specific cart.

router.delete("/:prodId", cartController.deleteProduct) // Delete a specific product from a specific cart.

router.put("/:operation/:prodId", cartController.modifyQuantity) // Update the quantity of a specific product from a specific cart.

router.delete("/:id", cartController.deleteCart) // Delete a specific cart.

module.exports = router
