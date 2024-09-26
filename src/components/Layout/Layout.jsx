import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
    const [toggle, setToggle] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <main >
                {
                    pathname == "/" || pathname.startsWith("/dashboard") ? (
                        <div className="flex flex-row min-h-full w-full">
                            <Sidebar toggle={toggle} setToggle={setToggle} />
                            <div
                                className={` min-h-full absolute right-0 ${toggle ? "toggle" : "layout "
                                    }`}
                            >
                                <Navbar toggle={toggle} setToggle={setToggle} />
                                {children}
                            </div>
                        </div>
                    ) : (
                        children
                    )
                }
            </main>
        </>
    )
}

export default Layout   