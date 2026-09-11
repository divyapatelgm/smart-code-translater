import axios from "axios";

// Do not fallback to localhost in production.
const isProd = import.meta.env.MODE === 'production';
const fallbackUrl = isProd ? "" : "http://localhost:5001/api";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || fallbackUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;