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

    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState(emptyProduct)
    const cookies = cookieParser()
    
    const updateItems = () => {
        fetch("/api/products", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }

    const deleteProduct = (prodId) => {
        fetch(`/api/products/${prodId}`, {
            method: 'DELETE'
        })
        .catch(e => console.log(e))

        setProducts(products.filter(prod => prod._id !== prodId))
    }

    const createNewProduct = async (e)  => {
        e.preventDefault()
        if (newProduct.title === "" || newProduct.description === "" || newProduct.code === "" || newProduct.img === "" || newProduct.price === "" || newProduct.stock === "") {
            alert("Hay campos vacios!")
        } else {
            axios.post("/api/products", newProduct)
                .then(({ data }) => {
                    products.push(data)
                    setProducts(products)
                    
                    setNewProduct(emptyProduct)
                })
        }
    }

    return (
        <ProductContext.Provider value={{
            products,
            updateItems,
            deleteProduct,
            createNewProduct,
            newProduct,
            setNewProduct
        }}>
            { children }
        </ProductContext.Provider>
    )
}