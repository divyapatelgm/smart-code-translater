import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Token Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Service to execute code via our backend proxy
 */
export const runCode = async (code, language, stdin = "") => {
  const response = await api.post("/code/execute", {
    code,
    language,
    stdin,
  });
  return response.data;
};
