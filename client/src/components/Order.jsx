import { Link } from "react-router-dom";

const Order = () => {
    return (
        <>
            <h2>
                Congratulations!
            </h2>
            <p>
                Your order has been placed successfully.
            </p>
            <Link to="/">Go back to homepage</Link>
        </>
    )
}

export default Order