import { createContext, useState, useContext } from "react"
import cookieParser from "../Utils/CookieParser"

export const ProductContext = createContext([])

export const useProductContext = () => useContext(ProductContext)

export const ProductContextProvider = ({ children }) => {
    
    const [products, setProducts] = useState([])
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

    // const addToCart = async (prodId)  => {
    //     const res = await fetch(`/api/cart/${prodId}`, {
    //         headers: { authorization: `Bearer ${cookies.token}` },
    //         method: 'POST'
    //     })
    
    //     if (res.status !== 200) {
    //         return
    //     }
    // }

    return (
        <ProductContext.Provider value={{
            products,
            updateItems,
            deleteProduct
        }}>
            { children }
        </ProductContext.Provider>
    )
}