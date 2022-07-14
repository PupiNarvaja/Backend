import React, { useState, useEffect } from 'react'
import cookieParser from '../../Utils/CookieParser'
import OrdersList from './OrdersList'

const Orders = () => {
    const [orders, setOrders] = useState([])
    // const [loading, setLoading] = useState(true)

    const cookies = cookieParser()

    useEffect(() => {
        fetch("/api/orders", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [])
    
    return (
        <section className="antialiased text-gray-600 px-4 mt-[50px] mb-[400px]">
            <div className="flex">
                <div className="w-full max-w-[75rem] mx-auto shadow-lg rounded-sm border border-gray-200">
                    <div className="flex justify-between px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Orders:</h2>
                        <h2>Total: {orders.length}</h2>
                    </div>
                    <div className="overflow-x-auto p-3">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">User</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Date</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Total</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Sent</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center">Actions</div>
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody id="cartProducts" className="divide-y divide-gray-100">
                                {orders != [] ? 
                                        <tr>
                                            <td className="p-2">
                                            <p className="absolute left-0 right-0 text-center">There are no orders placed.</p>
                                            </td>
                                        </tr>
                                    : 
                                    <OrdersList orders={orders} />}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders