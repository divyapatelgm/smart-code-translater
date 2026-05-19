import { useState } from "react";
import Editor from "@monaco-editor/react";
import Layout from "../components/Layout";
import { Play, Copy, Terminal, Search, Sparkles, Cpu, Zap, ChevronRight, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// 🔹 Logic Services
import { translateCode, analyzeComplexity, optimizeCode, explainCode } from "../services/codeService";
import { runCode } from "../services/executionService";

// 🔹 Components
import ExecutionConsole from "../components/ExecutionConsole";
import AIInsightsSidebar from "../components/AIInsightsSidebar";

// 🔹 Constants & Styles
import { LANGUAGES } from "../constants/languages";
import "../styles/EditorStyles.css";

const EditorPage = () => {
  const [sourceCode, setSourceCode] = useState("// Type your code here...");
  const [translatedCode, setTranslatedCode] = useState("");
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");
  
  // 🔹 AI & Execution States
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleData, setConsoleData] = useState({ output: "", error: "", stdin: "" });

  // 🔹 Insights Sidebar
  const [showInsights, setShowInsights] = useState(false);
  const [insightType, setInsightType] = useState(null);
  const [insightData, setInsightData] = useState(null);

  /**
   * Generalized AI action handler
   * Works for both Source and Translated panels
   */
  const handleAIAction = async (type, codeToProcess, language) => {
    if (!codeToProcess?.trim()) {
      toast.error("No code to process!");
      return;
    }

    setIsProcessing(true);
    setInsightType(type);
    
    try {
      let response;
      if (type === "translate") {
        response = await translateCode(sourceCode, sourceLang, targetLang);
        if (response.success) {
          setTranslatedCode(response.data.translatedCode);
          toast.success("AI Translation complete!");
        }
      } else {
        if (type === "analyze") response = await analyzeComplexity(codeToProcess, language);
        else if (type === "optimize") response = await optimizeCode(codeToProcess, language);
        else if (type === "explain") response = await explainCode(codeToProcess, language);

        if (response.success) {
          setInsightData(response.data);
          setShowInsights(true);
          toast.success(`Analysis ready!`);
        } else {
           // Handle rate limit specific errors
           if (response.error?.includes("429") || response.error?.toLowerCase().includes("quota")) {
             toast.error("AI is busy (Rate Limit). Please wait 10 seconds and try again.");
           } else {
             toast.error(response.error || "AI service is currently unavailable.");
           }
        }
      }
    } catch (error) {
      toast.error(`Service error. Please try again later.`);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Robust Copy Function with Fallback
   */
  const handleCopy = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Copied (Fallback mode)!");
      }
    } catch (err) {
      toast.error("Failed to copy code.");
    }
  };

  const handleRun = async (codeToRun, lang) => {
    if (!codeToRun.trim()) {
      toast.error("No code to execute!");
      return;
    }
    setShowConsole(true);
    setIsRunning(true);
    setConsoleData(prev => ({ ...prev, output: "", error: "" }));

    try {
      const result = await runCode(codeToRun, lang, consoleData.stdin);
      if (result.success) {
        setConsoleData(prev => ({ ...prev, output: result.data.run.stdout, error: result.data.run.stderr }));
        if (result.data.run.stderr) toast.error("Process error detected.");
        else toast.success("Process success.");
      }
    } catch (error) {
      setConsoleData(prev => ({ ...prev, error: error.message }));
      toast.error("Cloud execution failed.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Layout>
      <div className="zen-editor-wrapper">
        <div className="editor-nav">
          <div className="breadcrumb">
            <Code2 size={16} />
            <span>Workspace</span>
            <ChevronRight size={14} className="sep" />
            <span className="file-name">{sourceLang.toUpperCase()}</span>
          </div>
          
          <div className="global-actions">
            <button 
              className={`action-btn main ${isProcessing && insightType === "translate" ? 'loading' : ''}`} 
              onClick={() => handleAIAction("translate", sourceCode, sourceLang)}
              disabled={isProcessing}
            >
              <Zap size={16} fill="currentColor" /> {isProcessing && insightType === "translate" ? "Processing..." : "AI Translate"}
            </button>
            <button className="action-btn secondary" onClick={() => setShowConsole(!showConsole)}>
              <Terminal size={16} /> Console
            </button>
          </div>
        </div>

        <div className="zen-grid">
          {/* 🔹 Source Panel */}
          <div className="zen-panel">
            <div className="panel-chrome">
              <div className="chrome-left">
                <select className="minimal-select" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                   {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                </select>
              </div>
              <div className="chrome-right">
                <button className="chrome-btn" onClick={() => handleAIAction("analyze", sourceCode, sourceLang)} title="Complexity Analysis"><Cpu size={14} /></button>
                <button className="chrome-btn" onClick={() => handleAIAction("optimize", sourceCode, sourceLang)} title="Code Optimizer"><Sparkles size={14} /></button>
                <button className="chrome-btn" onClick={() => handleAIAction("explain", sourceCode, sourceLang)} title="Explain Logic"><Search size={14} /></button>
                <div className="divider"></div>
                <button className="run-orb" onClick={() => handleRun(sourceCode, sourceLang)} disabled={isRunning}><Play size={14} fill="currentColor" /></button>
              </div>
            </div>
            <div className="editor-canvas">
               <Editor
                height="100%"
                theme="vs-dark"
                language={sourceLang}
                value={sourceCode}
                onChange={(value) => setSourceCode(value)}
                options={{ 
                  minimap: { enabled: false }, 
                  fontSize: 14, 
                  lineHeight: 1.6,
                  fontFamily: 'JetBrains Mono',
                  padding: { top: 15 },
                  scrollBeyondLastLine: false,
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          </div>

          {/* 🔹 Translated Panel */}
          <div className="zen-panel">
            <div className="panel-chrome">
              <div className="chrome-left">
                <select className="minimal-select" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                   {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                </select>
              </div>
              <div className="chrome-right">
                 {translatedCode && (
                   <>
                    <button className="chrome-btn" onClick={() => handleAIAction("analyze", translatedCode, targetLang)} title="Complexity Analysis"><Cpu size={14} /></button>
                    <button className="chrome-btn" onClick={() => handleAIAction("optimize", translatedCode, targetLang)} title="Code Optimizer"><Sparkles size={14} /></button>
                    <button className="chrome-btn" onClick={() => handleAIAction("explain", translatedCode, targetLang)} title="Explain Logic"><Search size={14} /></button>
                    <div className="divider"></div>
                    <button className="chrome-btn" onClick={() => handleCopy(translatedCode)} title="Copy"><Copy size={14} /></button>
                    <button className="run-orb primary" onClick={() => handleRun(translatedCode, targetLang)} disabled={isRunning}><Play size={14} fill="currentColor" /></button>
                   </>
                 )}
              </div>
            </div>
            <div className="editor-canvas result-view">
               {translatedCode ? (
                  <pre className="code-display"><code>{translatedCode}</code></pre>
               ) : (
                  <div className="empty-state">
                    <Sparkles size={40} className="pulse-icon" />
                    <p>Enter code and click "AI Translate" to generate results across 25+ languages</p>
                  </div>
               )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showConsole && (
            <div className="console-floor">
               <ExecutionConsole 
                output={consoleData.output}
                error={consoleData.error}
                stdin={consoleData.stdin}
                setStdin={(val) => setConsoleData(prev => ({ ...prev, stdin: val }))}
                isRunning={isRunning}
                loading={isRunning}
                onClear={() => setConsoleData(prev => ({ ...prev, output: "", error: "" }))}
                onClose={() => setShowConsole(false)}
              />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showInsights && (
            <AIInsightsSidebar 
              type={insightType}
              data={insightData}
              onClose={() => { setShowInsights(false); setInsightData(null); }}
              onReplaceCode={(newCode) => { setSourceCode(newCode); setShowInsights(false); toast.success("Optimized code applied!"); }}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default EditorPage;
