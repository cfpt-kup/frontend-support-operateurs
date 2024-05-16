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
        code_used: '', // Add this if your signup requires an invitation code
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
            console.error('Signup error:', err);
            setError(err.response ? err.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                />
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
                <input
                    type="text"
                    name="code_used"
                    placeholder="Invitation Code"
                    value={formData.code_used}
                    onChange={handleChange}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
