import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client with API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Model name (fast + good for code)
const MODEL_NAME = "gemini-2.5-flash";

// 🔹 Function to send prompt to Gemini
const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    // Return only text output
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    throw new Error(`Gemini API failed: ${error.message}`);
  }
};

export { ai, MODEL_NAME, generateContent };