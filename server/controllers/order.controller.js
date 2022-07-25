const ModelFactory = require("../models/model.factory")
const mailSender = require("../notifications/mail")
const twilioSender = require("../notifications/twilio")
const logger = require("../log")

const orderModel = ModelFactory.getModel("order")
const cartModel = ModelFactory.getModel("cart")
const userModel = ModelFactory.getModel("user")

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAll()
        return res.send(orders)        
    } catch (error) {
        logger.error(error)
    }
}

const generateOrder = async (req, res) => {
    const { id, email } = req.user

    const context = { sent: false }

    try {
        const [products] = await cartModel.getCartProducts(id)
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

        const newOrder = await orderModel.newOrder(order, productsDetails, email)
        await cartModel.emptyCart(id)
    
        const productsLi = products.map(prod => `<li>${prod.title} x${prod.quantity} subtotal: $${prod.price}</li>`)
        const template = `
        <h1 style="color: blue;">Tu pedido está siendo procesado.</h1>
        <h3>Your order's id: ${newOrder._id}</h3>
        <p>Your products:</p>
        <ul>
            ${productsLi.join(" ")}
            <br>
            <li>Total: $${order.total}</li>
        </ul>
        `
        mailSender.send(template, email)
        context.sent = true

        logger.info(`Generating order for user with id: ${id}, email: ${email}.`)
        return res.redirect("/order")
    } catch (error) {
        logger.error(`Error at generating your order: ${error}`)
    }
}

const sendOrder = async (req, res) => {
    const orderId = req.params.orderId

    if (!orderId) {
        return res.sendStatus(404)
    }

    try {
        const order = await orderModel.getById(orderId)

        const user = await userModel.getById(order.userId)

        await orderModel.updateSentOrder(orderId)

        const productsLi = order.products.map(prod => `<li>${prod.title} x${prod.quantity} subtotal: $${prod.price}</li>`)
        const template = `
                <h1>Your purchase is on the way🔥</h1>
                <h2>Details:</h2>
                <ul>
                    ${productsLi.join(" ")}
                    <br>
                    <li>Your total is: $${order.total}</li>
                </ul>
                `
        mailSender.send(template, user.email)

        twilioSender.sendWhatsapp(user.phone)
        return res.send({ status: "Success!", description: `Order ${orderId} set as sent.` })
    } catch (error) {
        logger.error("Error at sending product: ", error)
    }
}


module.exports = {
    getAllOrders,
    generateOrder,
    sendOrder
}