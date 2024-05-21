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
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Profile Page</h1>
                {profile && (
                    <div className="space-y-4">
                        <p><strong className="text-gray-700">First Name:</strong> {profile.firstname}</p>
                        <p><strong className="text-gray-700">Last Name:</strong> {profile.lastname}</p>
                        <p><strong className="text-gray-700">Email:</strong> {profile.email}</p>
                        <p><strong className="text-gray-700">Invitation Code:</strong> {profile.code_used}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
