const Logout = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-40 py-20 bg-white rounded-md shadow-xl">
            <div className="flex flex-col items-center">
                <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                    Hope to see you again!
                </h6>

                <p className="mb-8 text-center text-gray-500 md:text-lg">
                    Until next time.
                </p>

                <a href="/login" className="px-6 py-2 text-sm font-semibold rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200">Log in</a>
            </div>
        </div>
    </div>
  )
}

export default Logout