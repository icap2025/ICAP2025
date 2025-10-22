import axios from "axios";
import { BACKEND_URL } from "../const";

const PUBLIC_AXIOS_CLIENT = axios.create({
  baseURL: BACKEND_URL,
});

// Response interceptor
PUBLIC_AXIOS_CLIENT.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 403) {
      console.error("Forbidden - you don't have access.");
    } else if (status >= 500) {
      console.error("Server error - try again later.");
    }

    // Optionally display a toast or modal
    return Promise.reject(error);
  }
);

export default PUBLIC_AXIOS_CLIENT;
