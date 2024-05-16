// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { logoutApi } from '../api/auth'; // Adjust the import path according to your project structure

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await logoutApi();
        } catch (error) {
            console.error('Failed to logout:', error);
        } finally {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
