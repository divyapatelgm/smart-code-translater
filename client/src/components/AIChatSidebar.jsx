import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Sparkles, Code, Check } from "lucide-react";
import { askSmartCode } from "../services/assistantService";
import toast from "react-hot-toast";
import "../styles/chatSidebar.css";

const AIChatSidebar = ({ isOpen, onClose, currentCode, currentLanguage, onApplyCode }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm SmartCode. Ask me to explain, debug, or write code for you.",
      code: null
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await askSmartCode({
        prompt: userMessage,
        currentCode: currentCode,
        currentLanguage: currentLanguage,
        conversationId: localStorage.getItem('smartcode_conversation_id') || crypto.randomUUID()
      });
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.explanation || (response.code ? "Here is the code you requested:" : "I'm sorry, I didn't understand that. Could you clarify?"),
        code: response.code || null,
        language: response.programmingLanguage || currentLanguage
      }]);
    } catch (error) {
      toast.error("Failed to get response from AI");
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="ai-chat-sidebar"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="var(--accent-cyan)" />
              <h3>AI Assistant</h3>
            </div>
            <button onClick={onClose} className="chat-close-btn">
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg-wrapper ${msg.role === 'user' ? 'user-msg' : 'ai-msg'}`}>
                <div className="chat-avatar">
                  {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                </div>
                <div className={`chat-bubble ${msg.isError ? 'error-bubble' : ''}`}>
                  <p>{msg.content}</p>
                  
                  {msg.code && (
                    <div className="chat-code-block">
                      <div className="chat-code-header">
                        <span>{msg.language || 'code'}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => copyCode(msg.code, idx)} className="chat-code-btn" title="Copy Code">
                            {copiedIndex === idx ? <Check size={14} color="#4cd964" /> : <Code size={14} />}
                          </button>
                          <button onClick={() => onApplyCode(msg.code, msg.language)} className="chat-code-btn apply-btn">
                            Apply
                          </button>
                        </div>
                      </div>
                      <pre><code>{msg.code}</code></pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="chat-msg-wrapper ai-msg">
                <div className="chat-avatar"><Sparkles size={14} /></div>
                <div className="chat-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <textarea
              placeholder="Ask anything about your code..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <button 
              className="chat-send-btn" 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatSidebar;
