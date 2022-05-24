// En orden alfabetico y primero librerias externas...
const express = require("express")
const mongoose = require("mongoose")

// ...luego nuestros propios documentos.
const app = express()
const routerCart = require("./routers/cart")
const routerProducts = require("./routers/products")
const adminMiddleware = require("./middlewares/admin")

const PORT = process.env.PORT || 8080
const { URI_CLOUD_CONNECTION } = require("./config")


mongoose.connect(URI_CLOUD_CONNECTION).then(() => {

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use("/api/cart", routerCart)
    app.use("/api/products", adminMiddleware, routerProducts)
    app.use("*", (req, res) => res.status(404).send({ error: "Page not found." }))

    app.listen(PORT, () => console.log("🚀 Server online."))

}).catch((err) => console.log("Error on mongo.", err))