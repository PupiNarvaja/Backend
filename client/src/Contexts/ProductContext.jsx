import { createContext, useState, useContext } from "react"
import cookieParser from "../Utils/CookieParser"
import { toast } from 'react-toastify';
import axios from "axios"

export const ProductContext = createContext([])

export const useProductContext = () => useContext(ProductContext)

export const ProductContextProvider = ({ children }) => {
    
    const toastifyConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const emptyProduct = {
        title: "",
        description: "",
        code: "",
        category: "",
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
        await axios.get("/api/products", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then(({ data }) => setProducts(data))
    }

    const deleteProduct = async (prodId) => {
        await axios.delete(`/api/products/${prodId}`)
            .then(({ data }) => toast.success(`${data.status}. ${data.description}`, toastifyConfig))
            .then(() => setProducts(products.filter(prod => prod._id !== prodId)))
            .catch(error => {
                const res = error.response.data
                toast.error(`${res.status}. ${res.description}`, toastifyConfig)
            })
    }

    const createNewProduct = async (e)  => {
        e.preventDefault()
        if (newProduct.title === "" || newProduct.description === "" || newProduct.code === "" || newProduct.category === "" || newProduct.img === "" || newProduct.price === "" || newProduct.stock === "") {
            toast.error("There are empty fields. Please check them.", toastifyConfig)
        } else {
            await axios.post("/api/products", newProduct)
                .then(({ data }) => {
                    toast.success(`${data.title} created successfully!`, toastifyConfig)
                    products.push(data)
                    setProducts(products)
                    setNewProduct(emptyProduct)
                })
                .catch(error => {
                    const res = error.response.data
                    toast.error(`${res.status}. ${res.description}`, toastifyConfig)
                })
        }
    }

    const getProduct = (prodId) => {
        const product = products.find(prod => prod._id === prodId)
        setIndividualProduct(product)
        setCreateOrUpdate("update")
    }

    const updateProduct = async (prodId) => {
        await axios.put(`/api/products/${prodId}`, individualProduct)
        .then(({ data }) => toast.success(`${data.title} updated successfully!`, toastifyConfig))
        .then(() => setIndividualProduct(emptyProduct))
        .catch(error => {
            const res = error.response.data
            toast.error(`${res.status}. ${res.description}`, toastifyConfig)
        })

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