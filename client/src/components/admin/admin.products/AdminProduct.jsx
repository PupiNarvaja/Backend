import { useProductContext } from "../../../Contexts/ProductContext"

const Product = ({ prod }) => {
    const { deleteProduct }  = useProductContext()

    return (
        <tr>
            <td className="p-4 w-36 h-40 mb-4 flex items-center overflow-hidden">
                <img src={prod.img} className="max-w-16"></img>
            </td>
            <td className="p-4">
                <h4>{prod.title}</h4>
            </td>
            <td className="p-4">
                <h4>{prod._id}</h4>
            </td>
            <td className="p-4">
                <h4>{prod.description}</h4>
            </td>
            <td className="p-4">
                <h5>{prod.price}</h5>
            </td>
            <td className="p-4">
                <div className="flex flex-col gap-2">
                    <form action="/api/products/" method="POST">{/*  Cambiar por axios! */}
                        <button type="submit" className="px-2 py-1 border-[1px] text-white bg-green-600 rounded-xl">Modify</button>
                    </form>
                    <button type="button" onClick={() => deleteProduct(`${prod._id}`)} className="px-2 py-1 border-[1px] text-white bg-rose-600 rounded-xl">Delete</button>
                </div>
            </td>
        </tr>
    )
}

export default Product