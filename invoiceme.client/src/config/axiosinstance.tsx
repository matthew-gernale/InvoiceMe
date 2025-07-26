import axios from 'axios';
//import { useAuthStore } from '../stores';
import { BaseURL } from '../stores/baseURLStore'

const api = axios.create({
    baseURL: BaseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

//api.interceptors.request.use(
//    (config) => {
//        const token = useAuthStore.getState().accessToken;
//        if (token) {
//            config.headers['Authorization'] = `Bearer ${token}`;
//        }

//        return config;
//    },
//    (error) => Promise.reject(error)
//);

// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post(
                    `${BaseURL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;