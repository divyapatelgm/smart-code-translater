import { getLanguageName } from "./languages.js";

// 🔹 1. TRANSLATE CODE
export const buildTranslatePrompt = (code, sourceLang, targetLang) => {
  return `
You are an expert programmer.

Translate the following ${getLanguageName(sourceLang)} code to ${getLanguageName(targetLang)}.

Rules:
1. Preserve logic and functionality exactly.
2. Use idiomatic syntax of the target language.
3. Include required imports/headers.
4. Do NOT add explanations.
5. Do NOT wrap output in markdown (no \`\`\`).

Source Code:
${code}

Translated Code:
`;
};


// 🔹 2. ANALYZE COMPLEXITY
export const buildAnalyzePrompt = (code, language) => {
  return `
You are a software engineer.

Analyze the following ${getLanguageName(language)} code.

Return ONLY valid JSON in this format:
{
  "timeComplexity": "",
  "spaceComplexity": "",
  "explanation": ""
}

Rules:
1. Use Big-O notation.
2. Consider worst-case complexity.
3. Keep explanation under 200 words.
4. Do NOT add extra text.
5. Do NOT use markdown.

Code:
${code}
`;
};


// 🔹 3. OPTIMIZE CODE
export const buildOptimizePrompt = (code, language) => {
  return `
You are an expert developer.

Optimize the following ${getLanguageName(language)} code.

Return ONLY valid JSON in this format:
{
  "optimizedCode": "",
  "suggestions": ""
}

Rules:
1. Maintain same functionality.
2. Improve performance and readability.
3. Use best practices.
4. Suggestions should be bullet points.
5. Do NOT use markdown formatting.

Code:
${code}
`;
};


// 🔹 4. EXPLAIN CODE
export const buildExplainPrompt = (code, language) => {
  return `
You are a programming teacher.

Explain the following ${getLanguageName(language)} code.

Return ONLY valid JSON in this format:
{
  "explanation": ""
}

Rules:
1. Use simple beginner-friendly language.
2. Explain key parts clearly.
3. Mention important concepts.
4. Keep it concise but clear.
5. Do NOT use markdown.

Code:
${code}
`;
};