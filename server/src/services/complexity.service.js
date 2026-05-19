import { askGemini } from "./gemini.service.js";
import { buildAnalyzePrompt } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";

export const analyzeCode = async (code, language) => {
  const prompt = buildAnalyzePrompt(code, language);

  const rawResponse = await askGemini(prompt);

  const result = parseGeminiJSON(rawResponse);

  return {
    timeComplexity: result.timeComplexity || "Unknown",
    spaceComplexity: result.spaceComplexity || "Unknown",
    explanation: result.explanation || "Could not determine complexity.",
  };
};