const router = require("express").Router()
const isAuthenticated = require("../../middlewares/isAuthenticated")
const mailSender = require("../../notifications/mail")
const CartModel = require("../../models/cart")
const OrderModel = require("../../models/order.model")

// /api/orders
router.post("/", isAuthenticated, async (req, res) => {
    const { id, email } = req.user

    const context = { sent: false }

    try {
        const [products] = await CartModel.getCartProducts(id)
        const productsPrices = products.map(prod => prod.price * prod.quantity)
        const productsDetails = products.map(prod => ({
            id: prod.id,
            quantity: prod.quantity,
            price: prod.price * prod.quantity
        }))

        const total = productsPrices.reduce((prev, curr) => prev + curr, 0)

        const order = {
            userId: id,
            total
        }

        await OrderModel.newOrder(order, productsDetails)
        await CartModel.emptyCart(id)
    
        const productsLi = products.map(prod => `<li>${prod.title}</li>`)
        const template = `
        <h1 style="color: blue;">Tu pedido está siendo procesado.</h1>
        <p>Aqui tus productos:</p>
        <ul>
            ${productsLi.join(" ")}
        </ul>
        `
        mailSender.send(template, email)
        context.sent = true

        res.redirect("/order")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router