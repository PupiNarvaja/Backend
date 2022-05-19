const path = require("path")
const fs = require("fs/promises")

class Cart {
    constructor() {
        this.path = path.join(__dirname, "../database/cart.json")
        this.data = [] // Carrito en memoria.
        this.readData()
    }

    async createCart(cart) {
        // Leemos el Cart.JSON.
        // Agregamos su tiempo de creacion + un id único.
        // Pusheamos dicho cart al array de carts.
        // Persistimos los datos.
        await this.readData()
        cart.timestamp = Date.now()
        cart.id = this.data[this.data.length - 1].id + 1
        this.data.push(cart)
        await this.writeData()
        return { status: "success", description:`Cart nº ${cart.id} created.` }
    }

    async addProduct(id, product) {
        // Leemos el Cart.JSON.
        // Obtenemos el cart solicitado.
        // Verificamos si no existe ya el producto dentro del cart.
        // De ser asi, suma 1 cantidad. Caso contrario, lo agrega al cart.
        // Persistimos los datos.
        await this.readData()
        const cart = this.getCart(id)
        const prodIndex = cart.products.findIndex(prod => prod.id == product.id)
        if (prodIndex !== -1) {
            cart.products[prodIndex].quantity += product.quantity
            await this.writeData()
            return { description: "One unit added." }
        }
        cart.products.push(product)
        await this.writeData()
        return { status: "success", description: "Product added successfully." }
    }

    async getCartProducts(id) {
        // Leemos el Cart.JSON.
        // Obtenemos el cart solicitado.
        // Retornamos los productos dentro del mismo.
        // { En caso de no haber productos, creo que eso ya se encarga el front mostrando un mensaje diciendo que no hay productos, no? }
        await this.readData()
        const cart = this.getCart(id)
        return cart.products
    }

    async deleteProduct(id, idProd) {
        // Leemos el Cart.JSON.
        // Obtenemos el cart solicitado.
        // Obtenemos el index del producto a eliminar.
        // Verificamos si hay productos dentro del cart.
        // Si no hay qué eliminar y/o no existe el producto dentro del cart, retorna error.
        // Caso contrario, filtra el cart y se elimina el producto solicitado.
        await this.readData()
        const cart = this.getCart(id)
        const prodIndex = cart.products.findIndex(prod => prod.id == idProd)
        if (cart.products.length === 0) {
            return { error: -1, description: "Empty cart." }
        }
        if (prodIndex === -1) {
            return { error: -1, description: "Product not found." }
        }
        
        cart.products = cart.products.filter(prod => prod.id != idProd)
        await this.writeData()
        return { status: "success", description: "Product deleted" }
    }

    async deleteCart(id) {
        // Leemos el Cart.JSON.
        // Verificamos que el cart exista.
        // De ser asi, filtramos y eliminamos el cart solicitado.
        // Caso contrario, retornamos error.
        await this.readData()
        const cartIndex = this.data.findIndex(cart => cart.id == id)
        console.log(cartIndex)
        if (cartIndex === -1) {
            return { status: "Error", description: "Cart does not exist." }
        }
        this.data = this.data.filter(cart => cart.id != id)
        await this.writeData()
        return { status: "success", description: "Cart deleted" }
    }
    
    getCart(id) {
        const cart = this.data.find(cart => cart.id == id)
        if (!cart) {
            throw new Error ("Cart does not exist.")
        }

        return cart
    }

    async readData() {
        this.data = JSON.parse(await(fs.readFile(this.path, "utf8")))
    }

    async writeData() {
        await fs.writeFile(this.path, JSON.stringify(this.data, null, 2))
    }
}

module.exports = new Cart() //Exporto la instancia ya creada con "new".