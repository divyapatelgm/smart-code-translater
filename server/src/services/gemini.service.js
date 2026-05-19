import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Official Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔹 List of models to try in order of priority/stability
const AVAILABLE_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash",
  "gemini-flash-latest",
  "gemini-pro-latest"
];

/**
 * Robust JSON Parser to extract JSON blocks from AI responses.
 * Sometimes the AI includes conversational text outside the markdown block.
 */
const extractJSON = (text) => {
  try {
    // Look for JSON block if it exists
    const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/) || text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("No JSON found in response");
    
    // Clean and parse
    const rawJson = match[1] || match[0];
    return JSON.parse(rawJson.trim());
  } catch (e) {
    console.error("JSON Extraction Error:", e.message, "Raw Text:", text);
    throw new Error("AI returned invalid data format. Please try again.");
  }
};

const generateWithRetry = async (prompt, retries = 2, delay = 2000) => {
  let lastError = null;

  for (const modelName of AVAILABLE_MODELS) {
    const model = genAI.getGenerativeModel({ model: modelName });
    
    for (let i = 0; i < retries; i++) {
      try {
        console.log(`[Gemini] Attempting with model: ${modelName} (Attempt ${i + 1}/${retries})`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
      } catch (error) {
        lastError = error;
        const errStatus = error.status || 0;
        const errMsg = error.message?.toLowerCase() || "";
        
        // Handle 404 / Not Found (Fallback to next model immediately)
        if (errStatus === 404 || errMsg.includes("not found") || errMsg.includes("not supported")) {
          console.warn(`[Gemini] Model ${modelName} not available. Falling back...`);
          break; // Move to the next model in AVAILABLE_MODELS
        }

        // Handle 429 (Rate Limit) and 503 (Overloaded)
        const isRetryable = errStatus === 429 || errStatus === 503 || errMsg.includes("503") || errMsg.includes("429");
        
        if (isRetryable && i < retries - 1) {
          console.log(`[Gemini] Model ${modelName} busy (${errStatus}). Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 1.5;
          continue;
        }

        // If it's a structural error or we ran out of retries for THIS model, move to the next model
        console.error(`[Gemini] Error with ${modelName}:`, error.message);
        break; 
      }
    }
  }

  throw lastError || new Error("All Gemini models failed to respond.");
};

export const translateCode = async (code, sourceLang, targetLang) => {
  const prompt = `Translate the following code from ${sourceLang} to ${targetLang}. 
  Return ONLY the translated code. Do not include markdown blocks like \`\`\` or any explanation.
  
  Code:
  ${code}`;

  const text = await generateWithRetry(prompt);
  // Clean off any markdown if AI ignores instructions
  const cleaned = text.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();
  return { translatedCode: cleaned };
};

export const analyzeComplexity = async (code, lang) => {
  const prompt = `Analyze the time and space complexity of the following ${lang} code.
  Return your response in a valid JSON format with three fields: "timeComplexity", "spaceComplexity", and "explanation".

  Code:
  ${code}`;

  const text = await generateWithRetry(prompt);
  return extractJSON(text);
};

export const optimizeCode = async (code, lang) => {
  const prompt = `Optimize the following ${lang} code for better performance or readability.
  Return your response in a valid JSON format with two fields: "optimizedCode" and "suggestions".

  Code:
  ${code}`;

  const text = await generateWithRetry(prompt);
  return extractJSON(text);
};

export const explainCode = async (code, lang) => {
  const prompt = `Explain what this ${lang} code does in high detail, step by step.
  Break the logic down into specific chronological steps.
  Return your response in a valid JSON format which is an array of objects. 
  Each object must have three fields: "id" (number), "title" (step name), and "description" (explanation).

  Code:
  ${code}`;

  const text = await generateWithRetry(prompt);
  return extractJSON(text);
};