import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedInUser = localStorage.getItem('loggedInUser');
        
        if (token && loggedInUser) {
            setIsAuthenticated(true);
            // If user is on login/signup page but authenticated, redirect to dashboard
            if (location.pathname === '/' || 
                location.pathname === '/login' || 
                location.pathname === '/signup') {
                navigate('/dashboard', { replace: true });
            }
        } else {
            setIsAuthenticated(false);
            // If user is on protected route but not authenticated, redirect to login
            if (location.pathname === '/dashboard') {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefrshHandler;
