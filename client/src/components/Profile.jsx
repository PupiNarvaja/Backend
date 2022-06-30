import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import cookieParser from '../Utils/CookieParser'

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])
    const cookies = cookieParser()

    useEffect(() => {
        fetch("/api/user", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then(res => res.json())
        .then(data => setUser(data))
        .finally(setLoading(false))
    }, [])
    

    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else {
        return(
            <main className="profile-page mt-12">
                <section className="relative block h-500-px">
                    <div className="w-full h-[500px] bg-center bg-cover" style={{backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')"}}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                    </div>
                    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: "translateZ(0px)"}}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                            <div className="relative">
                                <img alt="..." src={user.profile} className="shadow-xl rounded-full h-[128px] align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[unset]" />
                            </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm">Purchases</span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm">In cart</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="text-center mt-12">
                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                            {`${user.firstname} ${user.lastname}`}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2">
                                <p className="mr-2 text-base">
                                {user.email}
                                </p>
                            </div>
                            <div className="mb-2 mt-10">
                                <p className="mr-2 text-base">
                                {user.phone}
                                </p>
                            </div>
                            <div className="mb-2 mt-10">
                                <p className="mr-2 text-base">
                                {user.address}
                                </p>
                            </div>
                            <div className="mb-2 mt-10">
                                <p className="mr-2 text-base">
                                {user.age}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 py-10 border-t text-center">
                            <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed"></p>
                                <Link to="/" className="font-normal text-pink-500">Show more</Link>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </main>
        )
    }

}

export default Profile


// import React, { useState, useEffect } from 'react'
// import cookieParser from '../Utils/CookieParser'

// const Profile = () => {
//     const [loading, setLoading] = useState(true)
//     const [user, setUser] = useState([])
//     const cookies = cookieParser()

//     useEffect(() => {
//         fetch("/api/user", {
//             headers: {
//                 authorization: `Bearer ${cookies.token}`
//             }
//         })
//         .then(res => res.json())
//         .then(data => setUser(data))
//         .finally(setLoading(false))
//     }, [])
    

//     if (loading) {
//         return <span>Loading...</span>
//     } else {
//         return (<div>
//             <div>{user.email}</div>
//             <div>{user.firstname}</div>
//             <div>{user.lastname}</div>
//             <div>{user.age}</div>
//             <div>{user.address}</div>
//             <div>{user.phone}</div>
//             <img src={user.profile} classNameName="w-46 h-46 rounded-full"></img>
//         </div>)
//     }
// }

// export default Profile