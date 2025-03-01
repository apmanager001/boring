import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  timeout: 15000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
