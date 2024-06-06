import axios from 'axios';
import { isTokenExpired } from '../utils/auth';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        throw new Error('Token is expired or not found in localStorage');
    }
    return { Authorization: `Bearer ${token}` };
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Signup API error:', error);
        throw error;
    }
};

export const fetchProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: getAuthHeaders()
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch profile error:', error);
        throw error;
    }
};

export const updateProfile = async (profileData) => {
    try {
        const response = await axios.put(`${API_URL}/users`, profileData, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};

export const deleteProfile = async () => {
    try {
        const response = await axios.delete(`${API_URL}/users`, {
            headers: getAuthHeaders()
        });
        await logoutApi(); // Perform logout after profile deletion
        return response.data;
    } catch (error) {
        console.error('Delete profile error:', error);
        throw error;
    }
};

export const logoutApi = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: getAuthHeaders()
        });
        localStorage.removeItem('token'); // Remove token from localStorage
        return response.data;
    } catch (error) {
        console.error('Logout API error:', error);
        throw error;
    }
};
