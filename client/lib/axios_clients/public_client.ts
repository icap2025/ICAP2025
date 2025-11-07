import axios from "axios";
import { COOKIE_KEYS } from "../cookies";

// Public client for authentication endpoints (no token required)
const PUBLIC_AXIOS_CLIENT = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interceptor for public client
PUBLIC_AXIOS_CLIENT.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status >= 500) {
      console.error("Server error - try again later.");
    } else if (status === 404) {
      console.error("Endpoint not found.");
    }

    return Promise.reject(error);
  }
);

// Authenticated client for protected endpoints (token required)
const AUTHENTICATED_AXIOS_CLIENT = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - add token to headers
AUTHENTICATED_AXIOS_CLIENT.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_KEYS.USER.TOKEN}=`))
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
AUTHENTICATED_AXIOS_CLIENT.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Unauthorized - redirect to login
      console.error("Unauthorized - redirecting to login");
      window.location.href = "/login";
    } else if (status === 403) {
      console.error("Forbidden - you don't have access.");
    } else if (status >= 500) {
      console.error("Server error - try again later.");
    }

    return Promise.reject(error);
  }
);

export { PUBLIC_AXIOS_CLIENT };
export default AUTHENTICATED_AXIOS_CLIENT;