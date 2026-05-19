import axios from "axios";

// 🔹 Use the port we established (5001)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔒 Add Auth Interceptor so backend can track history for the logged-in user
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const translateCode = async (code, sourceLanguage, targetLanguage) => {
  // Routes are mounted at /api/code/translate in index.js
  const response = await api.post("/code/translate", {
    code,
    sourceLanguage,
    targetLanguage,
  });
  return response.data;
};

export const analyzeComplexity = async (code, language) => {
  const response = await api.post("/code/analyze", { code, language });
  return response.data;
};

export const optimizeCode = async (code, language) => {
  const response = await api.post("/code/optimize", { code, language });
  return response.data;
};

export const explainCode = async (code, language) => {
  const response = await api.post("/code/explain", { code, language });
  return response.data;
};