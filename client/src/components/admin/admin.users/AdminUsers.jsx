import React, { useState, useEffect } from 'react'
import cookieParser from '../../../Utils/CookieParser'
import AdminUsersList from './AdminUsersList'

const AdminUsers = () => {
    const [users, setUsers] = useState([])

    const cookies = cookieParser()

    useEffect(() => {
        fetch("/api/users/all", {
            headers: {
                authorization: `Bearer ${cookies.token}`
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])


    return (
        <section className="antialiased text-gray-600 px-4 mt-[50px] mb-[400px]">
            <div className="flex">
                <div className="w-full max-w-[75rem] mx-auto shadow-lg rounded-sm border border-gray-200">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <div className="font-semibold text-gray-800">Users:</div>
                    </div>
                    <div className="overflow-x-auto p-3">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">User</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Id</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Email</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Phone</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Address</div>
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody id="cartProducts" className="divide-y divide-gray-100">
                                <AdminUsersList users={users} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminUsers