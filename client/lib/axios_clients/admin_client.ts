import axios from "axios";
import { COOKIE_KEYS } from "../cookies";

// Admin authenticated client for admin-protected endpoints
const ADMIN_AXIOS_CLIENT = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
    timeout: 60000, // 60 second timeout (for large data exports)
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor - add admin token to headers
ADMIN_AXIOS_CLIENT.interceptors.request.use(
    (config) => {
        // Get admin token from cookie
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${COOKIE_KEYS.ADMIN.TOKEN}=`))
            ?.split("=")[1];

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
ADMIN_AXIOS_CLIENT.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            // Unauthorized - redirect to login
            console.error("Unauthorized - redirecting to login");
            window.location.href = "/login";
        } else if (status === 403) {
            console.error("Forbidden - you don't have admin access.");
        } else if (status >= 500) {
            console.error("Server error - try again later.");
        }

        return Promise.reject(error);
    }
);

export default ADMIN_AXIOS_CLIENT;
