import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const TEST_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-latest",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-exp",
  "gemini-1.5-flash-8b-latest",
  "gemini-1.5-flash-latest"
];

async function testModels() {
  console.log("Testing model availability (Extended)...");
  for (const modelId of TEST_MODELS) {
    try {
      console.log(`Testing ${modelId}...`);
      const response = await ai.models.generateContent({
        model: modelId,
        contents: "Hi",
      });
      console.log(`✅ ${modelId} SUCCESS!`);
      return; 
    } catch (error) {
      console.log(`❌ ${modelId} FAILED: ${error.message.substring(0, 150)}...`);
    }
  }
}

testModels();
