import { createContext, useState, useContext } from "react"
import cookieParser from "../Utils/CookieParser"
import { toast } from 'react-toastify';
import axios from "axios"

export const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({ children }) => {
    
    const [cartList, setcartList] = useState([])
    const [cartCounter, setCartCounter] = useState(0)
    const cookies = cookieParser()

    const toastifyConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    
    const updateCart = async () => {
        await axios.get("/api/cart", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then(({ data }) => setcartList(data))
        .catch(e => console.log(e))
    }

    const deleteProduct = async (prodId) => {
        await axios.delete(`/api/cart/${prodId}`)
        .then(({ data }) => toast.success(`${data.status}. ${data.description}`, toastifyConfig))
        .then(() => setcartList(cartList.filter(prod => prod.id !== prodId)))
        .catch(error => {
            const res = error.response.data
            toast.error(`${res.status}. ${res.description}`, toastifyConfig)
        })
    }

    const addToCart = async (prodId)  => {
        await axios.post(`/api/cart/${prodId}`, {
            headers: { authorization: `Bearer ${cookies.token}` }
        })
        .then(({ data }) => toast.success(`${data.status}. ${data.description}`, toastifyConfig))
        .catch(error => {
            const res = error.response.data
            toast.error(`${res.status}. ${res.description}`, toastifyConfig)
        })
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
        .then(({ data }) => toast.success(`${data.status}. ${data.description}`, toastifyConfig))
        .finally(() => updateCart())
        .catch(error => {
            const res = error.response.data
            toast.error(`${res.status}. ${res.description}`, toastifyConfig)
        })

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
            modifyQuantity,
            cartCounter
        }}>
            { children }
        </CartContext.Provider>
    )
}