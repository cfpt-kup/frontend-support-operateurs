// Signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        code_used: '',
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
            const response = await signup(formData);
            console.log('Signup response:', response);

            if (response && response.data && response.data.user) {
                const userData = response.data.user;
                console.log('User data:', userData);

                const token = userData.token;
                console.log('Token:', token);

                if (token) {
                    login(token);
                    console.log('Token stored in localStorage:', localStorage.getItem('token'));
                    navigate('/profile');
                } else {
                    setError('Failed to retrieve token from response');
                }
            } else {
                console.log('No user data found. Response data:', response);
                setError('No user data found in response');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response ? err.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="code_used"
                        placeholder="Invitation Code"
                        value={formData.code_used}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
