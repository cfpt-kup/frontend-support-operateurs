import React, { useEffect, useState } from 'react';
import { fetchProfile, updateProfile, deleteProfile } from '../../api/auth';
import Swal from 'sweetalert2';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        email: '',
        code_used: ''
    });
    const [originalProfile, setOriginalProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetchProfile();
                console.log(response); // Verify the response structure
                setProfile(response.data.user); // Correctly set the profile state
                setOriginalProfile(response.data.user); // Store the original profile state
                setLoading(false);
            } catch (err) {
                setError(err.message ? err.message : 'Failed to fetch profile');
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update your profile?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });

        if (result.isConfirmed) {
            try {
                await updateProfile(profile);
                Swal.fire('Success', 'Profile updated successfully!', 'success');
                setEditMode(false);
                setOriginalProfile(profile); // Update original profile with new data
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    };

    const handleCancel = () => {
        setProfile(originalProfile); // Reset profile to original data
        setEditMode(false);
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteProfile();
                Swal.fire('Deleted!', 'Your profile has been deleted.', 'success');
                // Optionally redirect or handle the post-deletion state
                window.location.href = '/login'; // Redirect to login or another appropriate page
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token'); // Ensure token is removed on 401
                    window.location.href = '/login';
                } else {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        }
    };

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
                        {editMode ? (
                            <>
                                <div>
                                    <label className="text-gray-700">First Name:</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={profile.firstname}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-700">Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={profile.lastname}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="mt-2 w-full bg-gray-500 text-white py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <p><strong className="text-gray-700">First Name:</strong> {profile.firstname}</p>
                                <p><strong className="text-gray-700">Last Name:</strong> {profile.lastname}</p>
                                <p><strong className="text-gray-700">Email:</strong> {profile.email}</p>
                                <p><strong className="text-gray-700">Invitation Code:</strong> {profile.code_used}</p>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="mt-2 w-full bg-red-500 text-white py-2 rounded-md"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
