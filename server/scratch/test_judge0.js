import axios from "axios";

const JUDGE0_URL = "https://ce.judge0.com/submissions?wait=true";

async function testJudge0() {
  const payload = {
    source_code: "print('hello from judge0')",
    language_id: 92, // Python
    stdin: null,
  };

  try {
    console.log("Testing Judge0 at:", JUDGE0_URL);
    const response = await axios.post(JUDGE0_URL, payload);
    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Judge0 Test Failed!");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
  }
}

testJudge0();
