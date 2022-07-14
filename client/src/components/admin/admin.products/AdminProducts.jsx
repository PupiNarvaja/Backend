import React, { useEffect } from 'react'
import { useProductContext } from '../../../Contexts/ProductContext'
import AdminProductsList from './AdminProductsList'
import AdminNewProduct from './AdminNewProduct'

const AdminProducts = () => {
    const { updateItems, products } = useProductContext()

    useEffect(() => {
        updateItems()
    }, [])

    return (
        <section className="antialiased text-gray-600 px-4 mt-[50px] mb-[400px]">
            <div className="flex">
                <div className="w-full max-w-[75rem] mx-auto shadow-lg rounded-sm border border-gray-200">
                    <div className="flex justify-between px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Products:</h2>
                        <h2>Total: {products.length}</h2>
                    </div>
                    <div className="overflow-x-auto p-3">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                <th className="p-2">
                                        <div className="font-semibold text-left">Image</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Title</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Id</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Description</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Price</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Actions</div>
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody id="cartProducts" className="divide-y divide-gray-100">
                                <AdminProductsList products={products} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AdminNewProduct />
        </section>
    )
}

export default AdminProducts