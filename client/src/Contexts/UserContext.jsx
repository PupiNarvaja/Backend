import { createContext, useState, useContext } from "react"
import axios from "axios"

export const UserContext = createContext([])

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({ children }) => {
    
    const [token, setToken] = useState(null)
    
    axios.interceptors.request.use(
        async config => {
        
        config.headers = { 
            'Authorization': `Bearer ${token}`,
        }
        return config;
        },
        error => {
        Promise.reject(error)
    })


    return (
        <UserContext.Provider value={{
            token,
            setToken
        }}>
            { children }
        </UserContext.Provider>
    )
}