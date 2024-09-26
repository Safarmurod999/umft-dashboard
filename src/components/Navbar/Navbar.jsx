import { Fragment, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

// import Spinner from "../Spinner/Spinner";
// import useFetch from "../../hooks/useFetch";

const userNavigation = [
    { name: "Your Profile", path: "/dashboard/profile" },
    { name: "Sign out", path: "/dashboard" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const Navbar = ({ toggle, setToggle }) => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [popup, setPopup] = useState(false)
    //   const { data: admin, loading, error } = useFetch(`admin/${username}`);

    // if (loading) {
    //     return <Spinner position={"relative"} />;
    // }
    // if (error) {
    //     console.log(error);
    // }
    const logOut = () => {
        localStorage.clear();

    };
    return (
        <nav className={`bg-gray-800 fixed layout z-100 w-full ${
          toggle ? "toggle" : "layout "
        }`}>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="cursor-pointer admin-toggle"
                        onClick={() => {
                            setToggle(!toggle);
                        }}>
                        <IoMenuSharp className="text-white"/>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3" onClick={() => setPopup(!popup)}>
                            <div>
                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>

                            <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${popup ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <p className="block px-4 py-2 text-sm text-gray-700">{userData.name}</p>
                                <div className="w-full h-[1px] bg-gray-500"></div>
                                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                                <a onClick={logOut} href="/login" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;