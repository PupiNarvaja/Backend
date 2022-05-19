const path = require("path")
const fs = require("fs/promises")

class Products {
    constructor() {
        this.path = path.join(__dirname, "../database/products.json")
        this.data = [] // Productos en memoria.
        this.readData()
    }

    getAllProducts() {
        return this.data
    }

    getProduct(id) {
        const prod = this.data.find(prod => prod.id == id)
        if (!prod) {
            return { error: 404, description: "Does not exist." }
        }
        return prod
    }

    async addProduct(prod) {
        // Verificamos si hay inputs vacíos. Si los hay, retorna error.
        // Caso contrario, leemos los datos.
        // Verificamos que no exista previamente el producto. Retorna error si asi es. Caso contrario lo crea.
        // Asignamos hora de creación.
        // Asignamos id.
        // Incorporamos el nuevo producto al array products.
        if (prod.title === "" || prod.description === "" || prod.code === "" || prod.img === "" || prod.price === "" || prod.stock === "") {
            return { error: -1, description: "Empty fields." } // TEMPORAL. Se sacará cuando en el form no permita campos vacíos.
        }
        await this.readData()
        const oldProdTitle = this.data.findIndex(product => product.title === prod.title)
        if (oldProdTitle !== -1) {
            return { error: -1, description: "Product already exists." }
        }
        prod.timestamp = Date.now()
        prod.id = this.data[this.data.length - 1].id + 1
        this.data.push(prod)
        await this.writeData()
    }

    async updateProduct(id, newProd) {
        // Obtenemos el producto a modificar.
        // Obtenemos index del producto a modificar. Si no existe, retorna error.
        // Caso contrario, reemplaza al producto antiguo manteniendo su id.
        // Modificamos el tiempo de creación.
        // Mantenemos el mismo id.
        // Persistimos datos.
        await this.readData()
        const oldProd = this.data.find(prod => prod.id == id)
        const index = this.data.findIndex(prod => prod.id == id)
        if (!oldProd) {
            return { error: 404, description: "Does not exist." }
        }
        this.data[index] = newProd
        newProd.timestamp = Date.now() // --> Modificamos el tiempo de creación.
        newProd.id = oldProd.id // --> Mantenemos el mismo ID antiguo.
        await this.writeData()
    }

    async deleteProduct(id) {
        await this.readData()
        const prod = this.data.find(prod => prod.id == id)
        if (!prod) {
            return { error: 404, description: "Does not exist." }
        }
        this.data = this.data.filter(prod => prod.id != id)
        await this.writeData()
    }

    async readData() {
        this.data = JSON.parse(await(fs.readFile(this.path, "utf8")))
    }

    async writeData() {
        await fs.writeFile(this.path, JSON.stringify(this.data, null, 2))
    }
}

module.exports = new Products() //Exporto la instancia ya creada con "new".