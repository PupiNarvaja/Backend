import { useProductContext } from '../../../Contexts/ProductContext'

const AdminNewProduct = () => {
    const { createNewProduct, newProduct, setNewProduct } = useProductContext()

  return (
    <div className="max-w-screen-xl px-4 pt-36 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
            <h2 className="font-medium">Create new product:</h2>
            <form className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
                <label htmlFor="title" className="text-sm font-medium dark:text-gray-200">Title</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="Title" type="text" name="title" value={newProduct.title} onChange={(e) => {
                    setNewProduct({
                        ...newProduct,
                        title: e.target.value
                    })
                }} />
                <label htmlFor="description" className="text-sm font-medium dark:text-gray-200">Description</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="description" type="text" name="description" value={newProduct.description} onChange={(e) => {
                    setNewProduct({
                        ...newProduct,
                        description: e.target.value
                    })
                }} />
                <label htmlFor="code" className="text-sm font-medium dark:text-gray-200">Code</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="code" type="text" name="code" value={newProduct.code} onChange={(e) => {
                    setNewProduct({
                        ...newProduct,
                        code: e.target.value
                    })
                }} />
                <label htmlFor="img" className="text-sm font-medium dark:text-gray-200">Image</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="img" type="text" name="img" value={newProduct.img} onChange={(e) => {
                    setNewProduct({
                        ...newProduct,
                        img: e.target.value
                    })
                }} />
                <label htmlFor="price" className="text-sm font-medium dark:text-gray-200">Price</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="price" type="number" name="price" value={newProduct.price} onChange={(e) => {
                    setNewProduct({
                        ...newProduct,
                        price: e.target.value
                    })
                }} />
                <label htmlFor="stock" className="text-sm font-medium dark:text-gray-200">Stock</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="stock" type="number" name="stock" value={newProduct.stock} onChange={(e) => {
                    setNewProduct({
                        ...newProduct,
                        stock: e.target.value
                    })
                }} />
                <button onClick={createNewProduct} className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">Create product</button>
            </form>
        </div>
    </div>
  )
}

export default AdminNewProduct