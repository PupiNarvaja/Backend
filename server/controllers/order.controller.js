const OrderModel = require("../models/order.model")
const CartModel = require("../models/cart")
const UserModel = require("../models/user")
const mailSender = require("../notifications/mail")
const twilioSender = require("../notifications/twilio")
const logger = require("../log/winston")

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.getAll()
        return res.send(orders)        
    } catch (error) {
        logger.error(error)
    }
}

const generateOrder = async (req, res) => {
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

        return res.redirect("/order")
    } catch (error) {
        logger.error(error)
    }
}

const sendOrder = async (req, res) => {
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
}


module.exports = {
    getAllOrders,
    generateOrder,
    sendOrder
}