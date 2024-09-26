import { lazy } from "react";
import { IoIosStats } from "react-icons/io";
import { BsDoorClosed } from "react-icons/bs";
import { PiTestTube } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { PiBuildingApartment } from "react-icons/pi";


const Dashboard = lazy(() => import("../pages/Admin/Dashboard/Dashboard"));
const Department = lazy(() => import("../pages/Admin/Department/Department"));
const Rooms = lazy(() => import("../pages/Admin/Rooms/Rooms"));
const Spec = lazy(() => import("../pages/Admin/Spec/Spec"));
const Position = lazy(() => import("../pages/Admin/Position/Position"));
const Doctor = lazy(() => import("../pages/Admin/Doctor/Doctor"));

export const BASE_URL = "http://195.158.9.124:4109";

export const adminRoutes = [
    {
        id: 0,
        path: "/dashboard",
        name: "Dashboard",
        current: true,
        icon: <IoIosStats />,
        element: <Dashboard />,
    },
    {
        id: 1,
        path: "/dashboard/department",
        name: "Department",
        icon: <PiBuildingApartment />,
        element: <Department />,
    },
    {
        id: 2,
        path: "/dashboard/rooms",
        name: "Rooms",
        icon: <BsDoorClosed />,
        element: <Rooms />,
    },
    {
        id: 3,
        path: "/dashboard/spec",
        name: "Spec",
        icon: <PiTestTube />,
        element: <Spec />,
    },
    {
        id: 4,
        path: "/dashboard/position",
        name: "Position",
        icon: <IoPersonOutline />,
        element: <Position />,
    },
    {
        id: 5,
        path: "/dashboard/doctor",
        name: "Doctor",
        icon: <FaUserDoctor />,
        element: <Doctor />,
    }
];