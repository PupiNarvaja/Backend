import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cookieParser from "../Utils/CookieParser"

const Login = () => {
    // const cookies = cookieParser()

    // console.log(cookies.token);

    // useEffect(() => {
    //     fetch("/login", {
    //         method: "POST",
    //         headers: {
    //             authorization: `Bearer ${cookies.token}`
    //         }
    //     })
    // }, [])

    return (
        <div className="max-w-screen-xl px-4 pt-36 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-500 sm:text-3xl">Welcome to This</h1>

                <p className="max-w-md mx-auto mt-4 text-center text-gray-500 dark:text-gray-300">
                Where you will be able to find those things you thought you wouldn't.
                </p>

                <form action="/login" method="POST" className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
                <p className="text-lg font-medium dark:text-gray-200">Sign in to your account</p>

                <div>
                    <label htmlFor="email" className="text-sm font-medium dark:text-gray-200">Email</label>

                    <div className="relative mt-1">
                    <input
                        name="email"
                        type="email"
                        id="email"
                        className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                        placeholder="Enter email"
                    />

                    <span className="absolute inset-y-0 inline-flex items-center right-4 dark:text-white">
                        @
                    </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="text-sm font-medium dark:text-gray-200">Password</label>

                    <div className="relative mt-1">
                    <input
                        name="password"
                        type="password"
                        id="password"
                        className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                        placeholder="Enter password"
                    />

                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                    👁
                    </span>
                    </div>
                </div>

                <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                    Sign in
                </button>

                <p className="text-sm text-center text-gray-500">
                    No account?
                    <Link to="/register" className="underline ml-2">Sign up </Link>
                </p>
                </form>
            </div>
        </div>
    )
}

export default Login


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import cookieParser from "../Utils/CookieParser"
// import axios from "axios"

// const Login = () => {
//     const cookies = cookieParser()

//     const [userCredentials, setUserCredentials] = useState({
//         email: '',
//         password: ''
//     })

//     const loginOnClick = (e) => {
//         e.preventDefault()
//         console.log("Sending login data...")
//         console.log(userCredentials)

//         axios.post("/login", userCredentials, {
//             headers: {
//                 authorization: `Bearer ${cookies.token}`
//             }
//         }).then(res => console.log(res))
//     }


//     return (
//         <div className="max-w-screen-xl px-4 pt-36 mx-auto sm:px-6 lg:px-8">
//             <div className="max-w-lg mx-auto">
//                 <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-500 sm:text-3xl">Welcome to This</h1>

//                 <p className="max-w-md mx-auto mt-4 text-center text-gray-500 dark:text-gray-300">
//                 Where you will be able to find those things you thought you wouldn't.
//                 </p>

//                 <form className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
//                 <p className="text-lg font-medium dark:text-gray-200">Sign in to your account</p>

//                 <div>
//                     <label htmlFor="email" className="text-sm font-medium dark:text-gray-200">Email</label>

//                     <div className="relative mt-1">
//                     <input
//                         name="email"
//                         type="email"
//                         id="email"
//                         className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
//                         placeholder="Enter email"
//                         value={userCredentials.email}
//                         onChange={(e) => {
//                             setUserCredentials({
//                                 ...userCredentials,
//                                 email: e.target.value
//                             })
//                         }}
//                     />

//                     <span className="absolute inset-y-0 inline-flex items-center right-4 dark:text-white">
//                         @
//                     </span>
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="password" className="text-sm font-medium dark:text-gray-200">Password</label>

//                     <div className="relative mt-1">
//                     <input
//                         name="password"
//                         type="password"
//                         id="password"
//                         className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
//                         placeholder="Enter password"
//                         value={userCredentials.password}
//                         onChange={(e) => {
//                             setUserCredentials({
//                                 ...userCredentials,
//                                 password: e.target.value
//                             })
//                         }}
//                     />

//                     <span className="absolute inset-y-0 inline-flex items-center right-4">
//                     👁
//                     </span>
//                     </div>
//                 </div>

//                 <button onClick={loginOnClick} className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
//                     Sign in
//                 </button>

//                 <p className="text-sm text-center text-gray-500">
//                     No account?
//                     <Link to="/register" className="underline ml-2">Sign up </Link>
//                 </p>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login