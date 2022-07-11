import React, { useState } from 'react'
import AdminProducts from "./admin.products/AdminProducts"
import AdminUsers from "./admin.users/AdminUsers"
import AdminOrders from "./Orders"

const Admin = () => {
    const [openTab, setOpenTab] = useState(1)

    return (
        <>
        <div>
            <div className="flex flex-wrap justify-center">
            <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
            >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <button
                    className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                        ? "text-white bg-violet-500"
                        : "text-black bg-white")
                    }
                    onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                >
                    Products
                </button>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <button
                    className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                        ? "text-white bg-violet-500"
                        : "text-black bg-white")
                    }
                    onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                >
                    Users
                </button>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <button
                    className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                        ? "text-white bg-violet-500"
                        : "text-black bg-white")
                    }
                    onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                >
                    Orders
                </button>
                </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                        <AdminProducts />
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                        <AdminUsers />
                    </div>
                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                        <AdminOrders />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default Admin