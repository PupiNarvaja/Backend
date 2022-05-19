const Cart = require("../model/cart")

// ------------- PRUEBAS ---------------
// const tryCatch = async (promise) => {
//     try {
//         const data = await promise
//         const error = null
//         return [data, error]
//     } catch (error) {
//         const data = null
//         const err = error
//         console.error(error)
//         return [data, err]
//     }
// }
// const { body } = req
// const [data, error] = await tryCatch(Cart.createCart(body))
// data != null ? res.status(201).send(data) : res.status(500).send({ error })

// const tryCatch = (promise) => {
//     return promise.then(data => [null, data]).catch(err => [err])
// }
// const data = null
// const err = null
// const { body } = req
// [data, err] = await tryCatch(Cart.createCart(body))
// err ? res.status(500).send(err) : res.status(201).send(data)
const createCart = async (req, res) => {
    try {
        const { body } = req
        res.status(201).send(await Cart.createCart(body))        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const addProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        res.status(201).send(await Cart.addProduct(id, body))
    } catch(e) {
        if (e.message === "Cart does not exist.") {
            res.sendStatus(404)
        } else {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

const getCartProducts = async (req, res) => {
    try {
        const { id } = req.params
        res.status(200).send(await Cart.getCartProducts(id))        
    } catch (error) {
       console.error(error)
       res.status(500).send(error) 
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id, prod } = req.params    
        res.status(200).send(await Cart.deleteProduct(id, prod))        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params
        res.status(202).send(await Cart.deleteCart(id))
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

module.exports = {
    createCart,
    addProduct,
    getCartProducts,
    deleteProduct,
    deleteCart
}