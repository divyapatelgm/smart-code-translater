import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getHistory = async (page = 1, limit = 10) => {
  const response = await api.get(`/history?page=${page}&limit=${limit}`);
  return response.data;
};

export const deleteHistoryItem = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export const clearHistory = async () => {
  const response = await api.delete("/history/clear");
  return response.data;
};