import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Call this function to get the token in axios headers
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    }
);

export default axiosClient;