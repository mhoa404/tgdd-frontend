import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children, adminRequired = false }) => {
    const [authStatus, setAuthStatus] = useState('checking');
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        /*---------------------------------
        Check token and role admin
        ----------------------------------*/
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (token && token.trim() !== '') {
            setAuthStatus('authenticated');
            setIsAdmin(user.role === 'admin');
        }
        else {
            setAuthStatus('unauthenticated');
        }
    }, []);
    if (authStatus === 'checking') {
        return _jsx("div", { children: "Loading..." });
    }
    if (authStatus === 'unauthenticated') {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    /*---------------------------------
     Navigate to not admin
    ----------------------------------*/
    if (adminRequired && !isAdmin) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return children;
};
export default PrivateRoute;
