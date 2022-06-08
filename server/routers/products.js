const router = require("express").Router()

const isAdmin = require("../middlewares/isAdmin")
const isLogged = require("../middlewares/isLogged")
const isAuthorized = require("../middlewares/jwt")
const productController = require("../controllers/products")

const path = require("path")

// /api/products
router.get("/", isAuthorized,  productController.getAllProducts) // Obtiene todos los productos existentes.

router.get("/show", isAuthorized,  (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/apiProducts.html"))
})

router.get("/:id", isAuthorized, isLogged, isAdmin, productController.getProduct) // Obtiene un producto determinado.

router.post("/", isAuthorized, isLogged, isAdmin, productController.createProduct) // Agrega un nuevo producto.

router.put("/:id", isAuthorized, isLogged, isAdmin, productController.updateProduct) // Modifica un producto existente.

router.delete("/:id", isAuthorized, isLogged, isAdmin, productController.deleteProduct) // Elimina un producto.


module.exports = router;