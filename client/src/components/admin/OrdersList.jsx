import Order from "./Order"

const OrdersList = ({ orders }) => {
    return (
        <>
            { orders.map((order) => <Order order={order} key={order.id} /> )}
        </>
    )
}

export default OrdersList