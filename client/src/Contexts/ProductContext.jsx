import { createContext, useState, useContext } from "react"
import cookieParser from "../Utils/CookieParser"
import axios from "axios"

export const ProductContext = createContext([])

export const useProductContext = () => useContext(ProductContext)

export const ProductContextProvider = ({ children }) => {
    
    const emptyProduct = {
        title: "",
        description: "",
        code: "",
        img: "",
        price: "",
        stock: "",
    }

    const cookies = cookieParser()
    
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState(emptyProduct)

    const [individualProduct, setIndividualProduct] = useState(emptyProduct)

    const [createOrUpdate, setCreateOrUpdate] = useState("create")
    
    const updateItems = async () => {
        await fetch("http://localhost:8080/api/products", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }

    const deleteProduct = (prodId) => {
        axios.delete(`http://localhost:8080/api/products/${prodId}`)
            .then((res) => {
                setProducts(products.filter(prod => prod._id !== prodId))
            })
            .catch(error => {
                let message;
                const status = error.response.status;
                status == 400
                    ? message = `An error occurred deleting product with id: ${prodId}. Code error: 400`
                    : status == 401
                    ? message = "Sorry. You are not authorized to do that. Code error: 401"
                    : status == 403
                    ? message = "Sorry. You do not have access to that resource. Code error: 403"
                    : status == 404
                    ? message = "Sorry, we couldn't find what you're looking for. Code error: 404"
                    : status == 405
                    ? message = "Sorry. Method not allowed. Code error: 405"
                    : status == 406
                    ? message = "Sorry. Data format not allowed. Code error: 406"
                    : status == 409
                    ? message = "Sorry. An error occurred trying to modify an element. Code error: 409"
                    : status == 500
                    ? message = "Sorry. An error occurred in our server. Code error: 500"
                    : message = "Product deleted successfully!"
                alert(message)
            })

    }

    const createNewProduct = (e)  => {
        e.preventDefault()
        if (newProduct.title === "" || newProduct.description === "" || newProduct.code === "" || newProduct.img === "" || newProduct.price === "" || newProduct.stock === "") {
            alert("Hay campos vacios!")
        } else {
            axios.post("http://localhost:8080/api/products", newProduct)
                .then(({ data }) => {
                    products.push(data)
                    setProducts(products)
                    
                    setNewProduct(emptyProduct)
                })
        }
    }

    const getProduct = (prodId) => {
        const product = products.find(prod => prod._id === prodId)
        setIndividualProduct(product)
        setCreateOrUpdate("update")
    }

    const updateProduct = async (prodId) => {
        await axios.put(`http://localhost:8080/api/products/${prodId}`, individualProduct)
        .then(res => setIndividualProduct(emptyProduct))
        .catch(e => console.log(e))

        setCreateOrUpdate("create")
        updateItems()
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setIndividualProduct({
            ...individualProduct,
            [name]: value
        })
    }

    return (
        <ProductContext.Provider value={{
            products,
            updateItems,
            deleteProduct,
            createNewProduct,
            getProduct,
            newProduct,
            setNewProduct,
            individualProduct,
            updateProduct,
            createOrUpdate,
            setCreateOrUpdate,
            handleChange,
        }}>
            { children }
        </ProductContext.Provider>
    )
}