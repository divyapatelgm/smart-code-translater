import { askGemini } from "./gemini.service.js";
import { buildExplainPrompt } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";

export const explainCode = async (code, language) => {
  const prompt = buildExplainPrompt(code, language);

  const rawResponse = await askGemini(prompt);

  const result = parseGeminiJSON(rawResponse);

  return {
    explanation: result.explanation || "No explanation available.",
  };
};