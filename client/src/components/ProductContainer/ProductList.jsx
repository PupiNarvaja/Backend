import Product from "./Product"

const ProductList = ({ products }) => {
    return (
        <>
            { products.map((prod) => <Product prod={prod} key={prod._id} /> )}
        </>
    )
}

export default ProductList