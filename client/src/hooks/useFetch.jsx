import cookieParser from "../Utils/CookieParser"

const useFetch = async (url, method) => {
    const cookies = cookieParser()

    const response = await fetch(url, {
        method: method,
        headers: {
            authorization: `Bearer ${cookies.token}`
        }
    })
    console.log(response.json());
    return await response.json()
}  

export default useFetch