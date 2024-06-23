import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const JWTtoken = useSelector((state) => state.auth.JWTtoken);

    return JWTtoken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;