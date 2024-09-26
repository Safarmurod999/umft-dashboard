import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    let [auth] = useState(
        localStorage.getItem("access_token")
    );
    return auth && auth != undefined && auth != null ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;