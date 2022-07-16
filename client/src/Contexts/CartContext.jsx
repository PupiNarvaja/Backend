import { createContext, useState, useContext } from "react"
import cookieParser from "../Utils/CookieParser"

export const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({ children }) => {
    
    const [cartList, setcartList] = useState([])
    const cookies = cookieParser()
    
    const updateCart = () => {
        fetch("http://localhost:8080/api/cart", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then((res) => res.json())
        .then((data) => setcartList(data))
    }

    const deleteProduct = (prodId) => {
        fetch(`http://localhost:8080/api/cart/${prodId}`, {
            method: 'DELETE'
        })
        .catch(e => console.log(e))

        setcartList(cartList.filter(prod => prod.id !== prodId))
    }

    const addToCart = async (prodId)  => {
        const res = await fetch(`http://localhost:8080/api/cart/${prodId}`, {
            headers: { authorization: `Bearer ${cookies.token}` },
            method: 'POST'
        })
    
        if (res.status !== 200) {
            return
        }
    }

   

    return (
        <CartContext.Provider value={{
            updateCart,
            cartList,
            addToCart,
            deleteProduct
        }}>
            { children }
        </CartContext.Provider>
    )
}