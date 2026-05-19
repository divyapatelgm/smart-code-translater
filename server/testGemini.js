import "dotenv/config";  // 🔥 ADD THIS LINE

import { askGemini } from "./src/services/gemini.service.js";

const test = async () => {
  const result = await askGemini("Explain what a loop is in simple terms");

  console.log(result);
};

test();