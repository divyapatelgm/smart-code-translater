import api from "./api";

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