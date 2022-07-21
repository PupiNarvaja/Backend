import { Link } from "react-router-dom"
import { useCartContext } from "../../Contexts/CartContext"

const Product = ({ prod }) => {
        
    const { addToCart }  = useCartContext()

    return (
        <div className="m-6 sm:m-10">
            <div className="w-36 h-56 sm:w-64 sm:h-80 mb-4 flex items-center overflow-hidden">
                <Link to={`/product/${prod._id}`}>
                    <img src={prod.img}/>
                </Link>
            </div>
            <p className="text-center archivo">{prod.title}</p>
            <p className="text-center archivo">${prod.price}</p>
            <button onClick={() => addToCart(`${prod._id}`)} className="py-2 px-4 mx-auto block cursor-pointer hover:underline hover:underline-offset-2 archivo">Add to cart</button>
        </div>
    )
}

export default Product