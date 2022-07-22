import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { useCartContext } from "../../Contexts/CartContext"
import CartList from "./CartList"

const Cart = () => {
    const [total, setTotal] = useState(0)

    const { updateCart, cartList } = useCartContext()

    useEffect(() => {
        updateCart()
    }, [])

    useEffect(() => {
        const totalToPay = cartList.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
        let moneyFormat = new Intl.NumberFormat('de-DE')
        return setTotal(moneyFormat.format(totalToPay))
    }, [cartList])
    

    return (
        <section className="antialiased text-gray-600 px-4 mt-[150px] mb-[400px]">
            <div className="flex">
                <div className="w-full max-w-[75rem] mx-auto shadow-lg rounded-sm border border-gray-200">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <div className="font-semibold text-gray-800">Your items:</div>
                    </div>
                        <div className="overflow-x-auto p-3">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th></th>
                                        <th className="p-2">
                                            <div className="font-semibold text-left">Product Details</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-left">Quantity</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-left">Total</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-center">Action</div>
                                        </th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-100">
                                    <CartList products={cartList} />
                                </tbody>
                            </table>
                        </div>
                    {
                        cartList.length == 0
                            ?
                        <div className="text-center p-6">
                            <p>It looks like you haven't added any products to your cart yet!</p>
                            <Link to="/"><button>Go back to homepage</button></Link>
                        </div>
                            :
                        <div className="flex justify-between font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                            <div>
                                <p>Total:</p>
                                <p className="text-blue-600">ARS <span>${total}</span></p>
                            </div>
                            <form action="/api/orders" method="POST">
                                <button type="submit">
                                    Place my order
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Cart