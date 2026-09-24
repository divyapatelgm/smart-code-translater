import api from "./api";

export const askSmartCode = async ({ prompt, currentCode, currentLanguage, conversationId }) => {
  const response = await api.post("/assistant/ask", {
    prompt,
    currentCode,
    currentLanguage,
    conversationId
  });
  return response.data;
};
