// Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData); // Adjust the URL as needed
            console.log('Login response:', response);

            if (response && response.data && response.data.data && response.data.data.user) {
                const userData = response.data.data.user;
                const token = userData.token;
                console.log('Token:', token);

                if (token) {
                    login(token); // Set token and update authentication state
                    console.log('Token stored in localStorage:', localStorage.getItem('token'));

                    // Redirect to profile page
                    navigate('/profile');
                } else {
                    setError('Failed to retrieve token from response');
                }
            } else {
                console.log('No user data found. Response data:', response);
                setError('No user data found in response');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response ? err.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
