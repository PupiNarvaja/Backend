import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="w-full h-[75vh] flex flex-col justify-center items-center">
            <h2 className="text-lg mb-4">Oops!</h2>
            <h2 className="max-w-full mx-auto text-center mb-12">It seems what you're looking for does not exist.</h2>
            <Link to="/"><button className="h-10 px-6 font-semibold leading-4 rounded-lg text-black bg-special-yellow transition ease hover:shadow-lg">Go back to homepage</button></Link>
            <h3>(Error 404: Not Found.)</h3>
        </div>
    )
}

export default NotFound