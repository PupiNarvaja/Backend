import cookieParser from "../../Utils/CookieParser"

const Product = ({ prod }) => {
    const cookies = cookieParser()

    const addToCart = async (prodId)  => {

        const res = await fetch(`http://localhost:8080/api/cart/${prodId}`, {
            headers: { authorization: `Bearer ${cookies.token}` },
            method: 'POST'
        })
    
        if (res.status !== 200) {
            return
        }
    
        // Funct to update cart counter.
    }

    return (
        <div className="m-10">
            <div className="w-64 h-80 mb-4 flex items-center overflow-hidden">
                <img src={prod.img}/>
            </div>
            <p className="text-center archivo">{prod.title}</p>
            <p className="text-center archivo">${prod.price}</p>
            <button onClick={() => addToCart(prod._id)} className="py-2 px-4 mx-auto block cursor-pointer hover:underline hover:underline-offset-2 archivo">Add to cart</button>
        </div>
    )
}

export default Product