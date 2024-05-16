// Profile.js
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        email: '',
        code_used: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetchProfile();
                console.log(response); // Verify the response structure
                setProfile(response.data.user); // Correctly set the profile state
                setLoading(false);
            } catch (err) {
                setError(err.message ? err.message : 'Failed to fetch profile');
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {profile && (
                <div>
                    <p><strong>First Name:</strong> {profile.firstname}</p>
                    <p><strong>Last Name:</strong> {profile.lastname}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Invitation Code:</strong> {profile.code_used}</p>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
