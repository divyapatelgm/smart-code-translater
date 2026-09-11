import api from "./api";

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

export const debugCode = async (code, language) => {
  const response = await api.post("/code/debug", { code, language });
  return response.data;
};