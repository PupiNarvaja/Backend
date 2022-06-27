import { Link } from "react-router-dom"

const Unauthorized = () => {
  return (
    <div className="w-full h-[75vh] flex flex-col justify-center items-center">
        <h2 className="text-lg mb-4">Sorry.</h2>
        <h2 className="max-w-full mx-auto text-center mb-12">You do not have acccess to this URL.</h2>
        <Link to="/"><button className="h-10 px-6 font-semibold leading-4 rounded-lg text-black bg-special-yellow transition ease hover:shadow-lg">Go back to homepage</button></Link>
        <h3>(Error 401: Unauthorized.)</h3>
    </div>
  )
}

export default Unauthorized