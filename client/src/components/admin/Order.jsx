import cookieParser from "../../Utils/CookieParser"
import { toast } from 'react-toastify';
import axios from "axios"

const Order = ({ order }) => {

    const cookies = cookieParser()
    const toastifyConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const sendOrder = (orderId, e) => {
        axios.post(`/api/orders/${orderId}`, {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then((res) => {
            toast.success("Order sent successfully!", toastifyConfig)
            const button = e.target
            button.disabled = true
            button.classList.add("bg-transparent")
            button.innerHTML = "✔️"
    
            const parent = e.target.parentNode.parentNode.parentNode
            const sent = parent.querySelector(".sent")
            sent.innerText = "Yes"
        })
        .catch(() => toast.error("Something went wrong a sending the order.", toastifyConfig))
    }

    return (
        <tr>
            <td className="p-2">
                <h4>{order.email}</h4>
            </td>
            <td className="p-2">
                <h4>{order.id}</h4>
            </td>
            <td className="p-2">
                <h4>{order.created}</h4>
            </td>
            <td className="p-2">
                <h4>{order.total}</h4>
            </td>
            <td className="p-2 sent">
                <h5>{order.sent}</h5>
            </td>
            <td className="p-2">
                <div className="flex justify-center">
                    {
                        order.sent == "Yes" ?
                        <button type="button" disabled className="px-4 py-2 bg-transparent">
                            ✔️
                        </button>
                        :
                        <button type="button" onClick={(e) => sendOrder(order.id, e)} className="px-4 py-2 bg-black text-white">
                            Send
                        </button>
                    }
                </div>
            </td>
        </tr>
    )
}

export default Order