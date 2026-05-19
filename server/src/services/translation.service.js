import { askGemini } from "./gemini.service.js";
import { buildTranslatePrompt } from "../constants/prompts.js";
import { cleanCodeResponse } from "../utils/prompts.utils.js";

export const translateCode = async (code, sourceLanguage, targetLanguage) => {
  const prompt = buildTranslatePrompt(code, sourceLanguage, targetLanguage);

  const rawResponse = await askGemini(prompt);

  const translatedCode = cleanCodeResponse(rawResponse);

  return {
    translatedCode,
    sourceLanguage,
    targetLanguage,
  };
};