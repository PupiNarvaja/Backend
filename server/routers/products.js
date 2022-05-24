const { Router } = require("express")
const router = Router()

const productController = require("../controllers/products")

// /api/products
router.get("/", productController.getAllProducts) // Obtiene todos los productos existentes.

router.get("/:id", productController.getProduct) // Obtiene un producto determinado.

router.post("/", productController.createProduct) // Agrega un nuevo producto.

router.put("/:id", productController.updateProduct) // Modifica un producto existente.

router.delete("/:id", productController.deleteProduct) // Elimina un producto.


module.exports = router;