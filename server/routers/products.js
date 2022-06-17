const router = require("express").Router()

const isAdmin = require("../middlewares/isAdmin")
const isAuthenticated = require("../middlewares/isAuthenticated")
const productController = require("../controllers/products")

const path = require("path")

// /api/products
router.get("/", isAuthenticated, productController.getAllProducts) // Obtiene todos los productos existentes.

router.get("/show", isAuthenticated, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/home.html"))
})

router.get("/:id", isAuthenticated, isAdmin, productController.getProduct) // Obtiene un producto determinado.

router.post("/", isAuthenticated, isAdmin, productController.createProduct) // Agrega un nuevo producto.

router.put("/:id", isAuthenticated, isAdmin, productController.updateProduct) // Modifica un producto existente.

router.delete("/:id", isAuthenticated, isAdmin, productController.deleteProduct) // Elimina un producto.


module.exports = router;