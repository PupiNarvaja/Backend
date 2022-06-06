const router = require("express").Router()

const isAdmin = require("../middlewares/isAdmin")
const isLogged = require("../middlewares/isLogged")
const productController = require("../controllers/products")

// /api/products
router.get("/", isLogged, isAdmin, productController.getAllProducts) // Obtiene todos los productos existentes.

router.get("/:id", isLogged, isAdmin, productController.getProduct) // Obtiene un producto determinado.

router.post("/", isLogged, isAdmin, productController.createProduct) // Agrega un nuevo producto.

router.put("/:id", isLogged, isAdmin, productController.updateProduct) // Modifica un producto existente.

router.delete("/:id", isLogged, isAdmin, productController.deleteProduct) // Elimina un producto.


module.exports = router;