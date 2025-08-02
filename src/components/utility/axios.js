import axios from "axios";

const axiosInstance = axios.create({
  // Use relative URLs for local API routes
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 15000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "API Response Error:",
      error.response?.status,
      error.config?.url,
      error.message
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
