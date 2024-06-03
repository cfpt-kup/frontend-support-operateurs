import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const NavBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire(
                    'Logged out!',
                    'You have been logged out.',
                    'success'
                );
            }
        });
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <Link to="/">CFPT - Support Opérateurs</Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    </li>
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
                            </li>
                            <li>
                                <Link to="/trello" className="text-white hover:text-gray-300">Trello</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
