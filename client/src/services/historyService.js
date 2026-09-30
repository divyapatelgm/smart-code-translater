import api from "./api";

export const getHistory = async (page = 1, limit = 10, q = "", signal = null) => {
  const queryParam = q ? `&q=${encodeURIComponent(q)}` : "";
  const response = await api.get(`/history?page=${page}&limit=${limit}${queryParam}`, { signal });
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

export const shareSnippet = async (id) => {
  const response = await api.put(`/history/share/${id}`);
  return response.data;
};

export const getPublicSnippet = async (id) => {
  const response = await api.get(`/history/snippet/${id}`);
  return response.data;
};