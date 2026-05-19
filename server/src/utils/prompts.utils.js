// 🔹 Parse JSON responses from Gemini (for analyze, optimize, explain)
export const parseGeminiJSON = (text) => {
  try {
    let cleanText = text.trim();

    // Remove markdown code blocks if present
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/^```(?:json)?\s*\n?/, "");
      cleanText = cleanText.replace(/\n?```\s*$/, "");
    }

    // Parse JSON safely
    return JSON.parse(cleanText.trim());
  } catch (error) {
    console.error("JSON Parse Error:", error.message);

    throw new Error("Failed to parse Gemini JSON response");
  }
};


// 🔹 Clean plain code responses (for translate)
export const cleanCodeResponse = (text) => {
  let cleanText = text.trim();

  // Remove markdown code blocks
  if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/^```\w*\s*\n?/, "");
    cleanText = cleanText.replace(/\n?```\s*$/, "");
  }

  return cleanText.trim();
};