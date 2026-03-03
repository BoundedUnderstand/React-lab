import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppContext from '../data/AppContext';

const ProtectedRoute = () => {
    const { isLoggedIn } = useContext(AppContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;