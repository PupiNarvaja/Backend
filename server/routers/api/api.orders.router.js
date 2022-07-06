const router = require("express").Router()
const isAuthenticated = require("../../middlewares/isAuthenticated")
const isAdmin = require("../../middlewares/isAdmin")
const mailSender = require("../../notifications/mail")
const twilioSender = require("../../notifications/twilio")
const UserModel = require("../../models/user")
const CartModel = require("../../models/cart")
const OrderModel = require("../../models/order.model")
const logger = require("../../log/winston")

// /api/orders
router.get("/", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const orders = await OrderModel.getAll()
        res.send(orders)        
    } catch (error) {
        logger.error(error)
    }
})

router.post("/", isAuthenticated, async (req, res) => {
    const { id, email } = req.user

    const context = { sent: false }

    try {
        const [products] = await CartModel.getCartProducts(id)
        const productsPrices = products.map(prod => prod.price * prod.quantity)
        const productsDetails = products.map(prod => ({
            id: prod.id,
            title: prod.title,
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
        logger.error(error)
    }
})

router.post("/:orderId", isAuthenticated, isAdmin, async (req, res) => {
    const orderId = req.params.orderId

    if (!orderId) {
        return res.sendStatus(404)
    }

    try {
        const order = await OrderModel.findOrderById(orderId)

        const user = await UserModel.getUserById(order.userId)

        await OrderModel.updateSentOrder(orderId)

        const productsLi = order.products.map(prod => `<li>${prod.title} x${prod.quantity} subtotal: $${prod.price}</li>`)
        const template = `
                <h1>Your purchase is on the way🔥</h1>
                <h2>Details:</h2>
                <ul>
                    ${productsLi.join(" ")}
                    <br>
                    <li>Total: $${order.total}</li>
                </ul>
                `
        mailSender.send(template, user.email)

        twilioSender.sendWhatsapp(user.phone)
    } catch (error) {
        logger.error("Error at sending product: ", error)
    }
})

module.exports = router