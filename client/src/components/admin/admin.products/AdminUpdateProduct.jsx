import { useProductContext } from '../../../Contexts/ProductContext'

const AdminUpdateProduct = () => {
    const { updateProduct, individualProduct, setIndividualProduct, handleChange } = useProductContext()

  return (
    <div className="max-w-screen-xl px-4 pt-36 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
            <form className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
                <label htmlFor="title" className="text-sm font-medium dark:text-gray-200">Title</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="Title" type="text" name="title" defaultValue={individualProduct.title} onChange={handleChange} />
                <label htmlFor="description" className="text-sm font-medium dark:text-gray-200">Description</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="description" type="text" name="description" defaultValue={individualProduct.description} onChange={handleChange} />
                <label htmlFor="code" className="text-sm font-medium dark:text-gray-200">Code</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="code" type="text" name="code" defaultValue={individualProduct.code} onChange={handleChange} />
                <label htmlFor="img" className="text-sm font-medium dark:text-gray-200">Image</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="img" type="text" name="img" defaultValue={individualProduct.img} onChange={handleChange} />
                <label htmlFor="price" className="text-sm font-medium dark:text-gray-200">Price</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="price" type="number" name="price" defaultValue={individualProduct.price} onChange={handleChange} />
                <label htmlFor="stock" className="text-sm font-medium dark:text-gray-200">Stock</label>
                <input className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white" placeholder="stock" type="number" name="stock" defaultValue={individualProduct.stock} onChange={handleChange} />
                <button className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg" onClick={(e) => {
                    e.preventDefault()
                    console.log(individualProduct)
                    updateProduct(`${individualProduct._id}`)
                }
                }>Update product</button>
            </form>
        </div>
    </div>
  )
}

export default AdminUpdateProduct