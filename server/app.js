const express = require("express")
const app = express()
const routerCart = require("./routers/cart")
const routerProducts = require("./routers/products")

app.use(express.json()) //Lea datos JSON.
app.use(express.urlencoded({ extended: true }))

app.use("/api/cart", routerCart)

app.use("/api/products", routerProducts)

app.use("*", (req, res) => {
    res.status(404).send({ error: "Page not found." })
})

app.listen(8080, () => console.log("Server online."))