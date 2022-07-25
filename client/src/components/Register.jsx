import { useState } from "react"

const Register = () => {
    const [phonePrefix, setPhonePrefix] = useState(549)

    const selectHandler = (e) => {
        setPhonePrefix(e.target.value)
    }

    return (
        <div className="max-w-screen-xl px-4 pt-36 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-500 sm:text-3xl">Welcome to This</h1>

                <p className="max-w-md mx-auto mt-4 text-center text-gray-500 dark:text-gray-300">
                Where you will be able to find those things you thought you wouldn't.
                </p>

                <form action="/register" method="POST" className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
                <p className="text-lg font-medium dark:text-gray-200">Let's create your new account.</p>

                <div className="flex gap-10">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium dark:text-gray-200">First name</label>

                        <div className="relative mt-1">
                            <input
                                name="firstname"
                                type="name"
                                id="username"
                                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                                placeholder="Enter name"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastname" className="text-sm font-medium dark:text-gray-200">Lastname</label>

                        <div className="relative mt-1">
                            <input
                                name="lastname"
                                type="lastname"
                                id="lastname"
                                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                                placeholder="Enter lastname"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="city" className="text-sm font-medium dark:text-gray-200">City</label>

                    <div className="relative mt-1">
                    <input
                        name="city"
                        type="city"
                        id="city"
                        className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                        placeholder="Enter address"
                    />

                    <span className="absolute inset-y-0 inline-flex items-center right-4 dark:text-white">
                        <img src="https://img.icons8.com/fluency-systems-regular/20/undefined/marker--v1.png"/>
                    </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="text-sm font-medium dark:text-gray-200">Address</label>

                    <div className="relative mt-1">
                    <input
                        name="address"
                        type="address"
                        id="address"
                        className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                        placeholder="Enter address"
                    />

                    <span className="absolute inset-y-0 inline-flex items-center right-4 dark:text-white">
                        <img src="https://img.icons8.com/material-rounded/20/undefined/home.png"/>
                    </span>
                    </div>
                </div>

                <div className="flex justify-between gap-10">
                    <div>
                        <label htmlFor="age" className="text-sm font-medium dark:text-gray-200">Age</label>

                        <div className="relative mt-1">
                            <input
                                name="age"
                                type="number"
                                min="1"
                                max="120" 
                                id="age"
                                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                                placeholder="Enter age"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="tel" className="text-sm font-medium dark:text-gray-200">Phone</label>

                        <div className="relative mt-1">
                            <select value={phonePrefix} onChange={selectHandler}>
                                <option value="549">🇦🇷</option>
                                <option value="52">🇲🇽</option>
                                <option value="56">🇨🇱</option>
                                <option value="55">🇧🇷</option>
                                <option value="57">🇨🇴</option>
                                <option value="58">🇻🇪</option>
                                <option value="34">🇪🇸</option>
                                <option value="1">🇺🇸</option>
                            </select>
                            <input
                                name="phone"
                                type="tel"
                                id="phone"
                                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-[0px] dark:text-white"
                                placeholder="Enter phone"
                                value={phonePrefix}
                                onChange={(e) => setPhonePrefix(e.value)}
                            />
                        </div>
                    </div>
                </div>

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
                    <label htmlFor="emailCheck" className="text-sm font-medium dark:text-gray-200">Reenter your email</label>

                    <div className="relative mt-1">
                    <input
                        name="emailCheck"
                        type="emailCheck"
                        id="emailCheck"
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
                    Already have an account?
                    <a href="/login" className="underline ml-2">Log in</a>
                </p>
                </form>
            </div>
        </div>
    )
}

export default Register