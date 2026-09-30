import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, Mic, MicOff } from "lucide-react";
import { askSmartCode } from "../services/assistantService";
import toast from "react-hot-toast";

const AskSmartCode = ({ currentCode, currentLanguage, onCodeGenerated, onInsightGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  
  // We need a ref to store the recognition instance so we can stop it if needed
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition on mount if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true; // Show words as they are spoken
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        toast("Listening...", { icon: '🎙️', id: 'voice-toast' });
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        
        setPrompt(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        toast.dismiss('voice-toast');
        if (event.error === 'not-allowed') {
          toast.error("Microphone access denied.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        toast.dismiss('voice-toast');
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast.error("Voice recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setPrompt(""); // clear before new dictation
      recognitionRef.current.start();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await askSmartCode({
        prompt,
        currentCode,
        currentLanguage,
        conversationId
      });

      if (response.success) {
        const { intent, code, explanation, naturalLanguage, programmingLanguage, warnings, suggestions } = response.data;
        
        toast.success(`Intent detected: ${intent}`);
        
        if (code && code.trim().length > 0) {
          onCodeGenerated(code, programmingLanguage);
        }

        if (explanation || (warnings && warnings.length > 0) || (suggestions && suggestions.length > 0)) {
          onInsightGenerated({
            intent,
            explanation,
            warnings,
            suggestions,
            naturalLanguage,
            programmingLanguage
          });
        }
      } else {
        toast.error("Failed to get response from AI");
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message || "Error processing request";
      if (errorMsg.includes("429") || errorMsg.toLowerCase().includes("quota") || errorMsg.toLowerCase().includes("too many requests")) {
        toast.error("AI is busy (Rate Limit). Please wait a moment and try again.");
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className="ask-smartcode-container" style={{
      background: "rgba(30,30,30,0.95)",
      border: "1px solid #333",
      borderRadius: "12px",
      padding: "16px",
      margin: "16px 0",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", gap: "8px" }}>
        <Sparkles size={20} color="#a855f7" />
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#e5e7eb" }}>Ask SmartCode</h3>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want to do (e.g., 'Write a Python script to sum two numbers' or 'Explain this code')"
          disabled={isLoading}
          style={{
            width: "100%",
            minHeight: "80px",
            background: "#1e1e1e",
            border: "1px solid #444",
            borderRadius: "8px",
            padding: "12px",
            color: "#fff",
            fontFamily: "inherit",
            resize: "vertical",
            outline: "none"
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#888" }}>Press Cmd/Ctrl + Enter to submit</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={toggleVoiceInput}
              title={isListening ? "Stop listening" : "Voice to Code"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isListening ? "rgba(255, 69, 58, 0.2)" : "rgba(168, 85, 247, 0.1)",
                color: isListening ? "#ff453a" : "#a855f7",
                border: `1px solid ${isListening ? "#ff453a" : "rgba(168, 85, 247, 0.3)"}`,
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button 
              type="submit" 
              disabled={isLoading || !prompt.trim()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#a855f7",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: isLoading || !prompt.trim() ? "not-allowed" : "pointer",
                opacity: isLoading || !prompt.trim() ? 0.7 : 1,
                fontWeight: "500"
              }}
            >
              {isLoading ? <Loader2 size={16} className="lucide-spin" /> : <Send size={16} />}
              {isLoading ? "Thinking..." : "Generate"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AskSmartCode;
