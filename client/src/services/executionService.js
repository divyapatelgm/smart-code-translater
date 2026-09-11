import api from "./api";

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
