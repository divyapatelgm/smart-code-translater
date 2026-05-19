import { askGemini } from "./gemini.service.js";
import { buildOptimizePrompt } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";

export const optimizeCode = async (code, language) => {
  const prompt = buildOptimizePrompt(code, language);

  const rawResponse = await askGemini(prompt);

  const result = parseGeminiJSON(rawResponse);

  return {
    optimizedCode: result.optimizedCode || "",
    suggestions: result.suggestions || "No suggestions available.",
  };
};