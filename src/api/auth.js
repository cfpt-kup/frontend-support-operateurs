import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust this URL according to your backend URL

export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};
