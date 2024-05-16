// Profile.js
import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../../api/auth';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        email: '',
        code_used: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        </div>
    );
};

export default Profile;
