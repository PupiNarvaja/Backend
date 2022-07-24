const router = require("express").Router()
const isAdmin = require("../../middlewares/isAdmin")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const productController = require("../../controllers/products.controller")

// "/api/products"
router.use(isAuthenticated)

router.get("/", productController.getAllProducts) // Obtiene todos los productos existentes.

router.get("/category/:category", productController.getProductsByCategory) // Obtiene todos los productos existentes de determinada categoría.

router.get("/:id", productController.getProduct) // Obtiene un producto determinado.

router.post("/", isAdmin, productController.createProduct) // Agrega un nuevo producto.

router.put("/:id", isAdmin, productController.updateProduct) // Modifica un producto existente.

router.delete("/:id", isAdmin, productController.deleteProduct) // Elimina un producto.

module.exports = router