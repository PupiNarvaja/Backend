import CartProduct from "./CartProduct"

const CartList = ({ products }) => {
    return (
        <>
            { products.map((prod) => <CartProduct prod={prod} key={prod._id} /> )}
        </>
    )
}

export default CartList