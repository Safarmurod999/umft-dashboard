import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Dashboard, Department, Doctor, Login, NotFound, Position, Register, Rooms, Spec } from "../pages/index"
import { Layout } from "../components";
import ProtectedRoute from "./ProtectedRoute";

export const routesArr = [
    {
        id: 0,
        path: "/dashboard",
        element: Dashboard,
    },
    {
        id: 1,
        path: '/dashboard/department',
        element: Department
    },
    {
        id: 2,
        path: '/dashboard/rooms',
        element: Rooms
    },
    {
        id: 3,
        path: '/dashboard/spec',
        element: Spec
    },
    {
        id: 4,
        path: '/dashboard/position',
        element: Position
    },
    {
        id: 5,
        path: '/dashboard/doctor',
        element: Doctor
    }
];

const Router = () => {
    const route = useLocation();

    return (
        <>
            {
                route.pathname == "/login" ? (
                    <Routes>
                        <Route path={'/login'} element={<Login />} />
                    </Routes>
                ) : route.pathname == "/register" ? (
                    <Routes>
                        <Route path={'/register'} element={<Register />} />
                    </Routes>
                ) : route.pathname.startsWith("/dashboard") ? (
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            {
                                routesArr.map((route, index) => {
                                    const RouteComponent = route.element;
                                    return (
                                        <Route key={index} index={route.path == "/dashboard" && true} path={route.path}
                                            element={
                                                <Layout>
                                                    <RouteComponent />
                                                </Layout>
                                            } />
                                    )
                                })
                            }
                        </Route>
                        <Route path='*' element={<NotFound />} />

                    </Routes>
                ) : (<Routes><Route path='/' element={<Navigate to={'/dashboard'} replace />} /></Routes>)
            }
        </>
    )
}

export default Router