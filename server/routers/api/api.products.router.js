const router = require("express").Router()
const isAdmin = require("../../middlewares/isAdmin")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const productController = require("../../controllers/products.controller")

// "/api/products"
router.use(isAuthenticated)

router.get("/", productController.getAllProducts)

router.get("/category/:category", productController.getProductsByCategory)

router.get("/:id", productController.getProduct)

router.post("/", isAdmin, productController.createProduct)

router.put("/:id", isAdmin, productController.updateProduct)

router.delete("/:id", isAdmin, productController.deleteProduct)

module.exports = router