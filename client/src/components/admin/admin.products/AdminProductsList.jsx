import AdminProduct from "./AdminProduct.jsx"

const AdminProductsList = ({ products }) => {
    return (
        <>
            { products.map((prod) => <AdminProduct prod={prod} key={prod.id} /> )}
        </>
    )
}

export default AdminProductsList