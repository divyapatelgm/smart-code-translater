import axios from "axios";

/**
 * Service to handle code execution via the Judge0 API.
 * Judge0 is a modern, open-source code execution system.
 * We are using the public CE instance: ce.judge0.com
 */

const JUDGE0_URL = "https://ce.judge0.com/submissions?wait=true";

// Mapping our local language IDs to Judge0 IDs
// Based on standard Judge0 CE v1.34 ID list
const LANG_MAP = {
  c: 75,          // GCC 13.2.0
  cpp: 76,        // GCC 13.2.0
  csharp: 86,     // .NET 7.0
  java: 91,       // JDK 17.0.6
  python: 92,     // Python 3.11.2
  javascript: 93, // Node.js 18.15.0
};

export const executeCode = async (code, language, stdin = "") => {
  const languageId = LANG_MAP[language];
  
  if (!languageId) {
    throw new Error(`Execution not supported for language: ${language}`);
  }

  // Judge0 expected payload
  const payload = {
    source_code: code,
    language_id: languageId,
    stdin: stdin || null,
  };

  try {
    const response = await axios.post(JUDGE0_URL, payload);
    const data = response.data;

    // Normalize Judge0 response to match our previous contract
    // Judge0 returns stdout, stderr, and compile_output (for C/C++/Java/C#)
    return {
      run: {
        stdout: data.stdout || "",
        stderr: (data.stderr || "") + (data.compile_output || ""),
        output: (data.stdout || "") + (data.stderr || "") + (data.compile_output || ""),
        code: data.status?.id === 3 ? 0 : 1, // 3 is "Accepted"
        signal: data.status?.description || null
      }
    };
  } catch (error) {
    console.error("Judge0 API Error:", error.response?.data || error.message);
    throw new Error("Failed to execute code via Judge0. The service might be temporarily unavailable.");
  }
};
