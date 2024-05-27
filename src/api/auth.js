import axios from 'axios';
import { isTokenExpired } from '../utils/auth';

const API_URL = process.env.REACT_APP_API_URL;

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
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        throw new Error('Token is expired or not found in localStorage');
    }

    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch profile error:', error);
        throw error;
    }
};

export const logoutApi = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found in localStorage');

    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Logout API error:', error);
        throw error;
    }
};
