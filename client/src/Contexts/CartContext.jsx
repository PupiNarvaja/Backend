import { createContext, useState, useContext } from "react"
import cookieParser from "../Utils/CookieParser"
import axios from "axios"

export const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({ children }) => {
    
    const [cartList, setcartList] = useState([])
    const cookies = cookieParser()
    
    const updateCart = () => {
        fetch("/api/cart", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then((res) => res.json())
        .then((data) => setcartList(data))
    }

    const deleteProduct = (prodId) => {
        fetch(`/api/cart/${prodId}`, {
            method: 'DELETE'
        })
        .catch(e => console.log(e))

        setcartList(cartList.filter(prod => prod.id !== prodId))
    }

    const addToCart = async (prodId)  => {
        const res = await fetch(`/api/cart/${prodId}`, {
            headers: { authorization: `Bearer ${cookies.token}` },
            method: 'POST'
        })
    
        if (res.status !== 200) {
            return
        }
    }

    const modifyQuantity = async (operation, prodId) => {
        const modifyQuantityBtn = document.getElementsByClassName("modifyQuantityBtn")
        
        for (let i = 0; i < modifyQuantityBtn.length; i++) {
            modifyQuantityBtn[i].disabled = true
            modifyQuantityBtn[i].style.cursor = "not-allowed"
        }

        await axios.put(`/api/cart/${operation}/${prodId}`, {
            headers: { authorization: `Bearer ${cookies.token}` }
        })
        .then(() => updateCart())

        for (let i = 0; i < modifyQuantityBtn.length; i++) {
            modifyQuantityBtn[i].disabled = false
            modifyQuantityBtn[i].style.cursor = "pointer"
        }
    }

    return (
        <CartContext.Provider value={{
            updateCart,
            cartList,
            addToCart,
            deleteProduct,
            modifyQuantity
        }}>
            { children }
        </CartContext.Provider>
    )
}