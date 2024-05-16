// NavBar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/trello">Trello</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}>Logout</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
