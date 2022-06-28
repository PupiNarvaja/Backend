import { useCartContext } from "../../Contexts/CartContext"

const CartProduct = ({ prod }) => {
    const { deleteProduct }  = useCartContext()

    return (
        <tr id="${prod.id}">
            <td className="p-2">
                <div className="w-36 h-40 mb-4 flex items-center overflow-hidden">
                    <img src={prod.img} className="max-w-16" />
                </div>
            </td>
            <td className="p-2">
                <div className="font-medium text-gray-800 flex flex-col">
                    <h4>{prod.title}</h4>
                    <p className="max-w-[25rem] text-gray-400 font-extralight">{prod.description}</p>
                </div>
            </td>
            <td className="p-2">
                <div className="text-left">
                    <button type="button" className="text-xl leading-[0px] w-6 h-6 rounded-full hover:text-blue-600 hover:bg-gray-100">-</button>
                    {prod.quantity}
                    <button type="button" className="text-xl leading-[0px] w-6 h-6 rounded-full hover:text-blue-600 hover:bg-gray-100">+</button>
                </div>
            </td>
            <td className="p-2">
                <div className="text-left font-medium text-green-500">
                    ${prod.quantity * prod.price}
                </div>
            </td>
            <td className="p-2">
                <div className="flex justify-center">
                    <button type="button" onClick={() => deleteProduct(`${prod.id}`)}>
                        <svg className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CartProduct