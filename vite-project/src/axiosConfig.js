import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'https://employee-management-system-backend-pywi.onrender.com/api', // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors (e.g., redirect to login)
            console.error('Unauthorized, redirecting to login...');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
