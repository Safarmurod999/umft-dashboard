import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminRoutes } from "../../const/data";
import { IoCloseSharp } from "react-icons/io5";
const Sidebar = ({ toggle, setToggle }) => {
    const { pathname } = useLocation();

    const [activeRoute, setActiveRoute] = useState(
        pathname || 0
    );
    const isSuperAdmin =
        JSON.parse(localStorage.getItem("isSuperAdmin")) || false;
    return (
        <aside
            className={`flex flex-col w-[300px] fixed top-0 left-0 z-20 h-screen px-2 py-3 overflow-y-auto bg-gray-800 ${toggle ? "toggle-sidebar" : "sidebar"
                } `}
        >
            <div className="relative">
                <p className="text-white text-2xl px-2">Med Admin</p>
                <IoCloseSharp
                    className="flex xl:hidden absolute top-[10px] right-[10px]"
                    onClick={() => setToggle(!toggle)}
                />
            </div>

            <div className="flex flex-col justify-between border-t border-gray-500 pt-4 flex-1 mt-4">
                <nav className="space-y-6 ">
                    <div className="space-y-3 ">
                        <label
                            className={`px-3 text-xs text-gray-500 uppercase ${toggle ? "hidden" : "flex"
                                }`}
                        >
                            analytics
                        </label>

                        {adminRoutes.map((item) => {

                            if (item.path !== "/admin/admins") {
                                return (
                                    <Link
                                        key={item.id}
                                        className={`flex items-center px-3 py-2 text-white-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700 ${`${activeRoute}` == `${item.path}` ? "bg-gray-700 text-gray-700" : ""
                                            }`}
                                        to={item.path}
                                        onClick={() => {
                                            setActiveRoute(item.path);

                                        }}
                                    >
                                        {item.icon}
                                        <span className={` mx-2 text-lg text-white font-medium`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            } else {
                                if (isSuperAdmin) {
                                    return (
                                        <Link
                                            key={item.id}
                                            className={`flex items-center px-3 py-2 text-white-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700 ${`${activeRoute}` == `${item.path}`
                                                ? "bg-gray-700 text-gray-700"
                                                : ""
                                                }`}
                                            to={item.path}
                                            onClick={() => {
                                                setActiveRoute(item.path);

                                            }}
                                        >
                                            {item.icon}
                                            <span className={` mx-2 text-lg text-white font-medium`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                }
                            }
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;