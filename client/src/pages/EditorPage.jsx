import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Layout from "../components/Layout";
import { Play, Copy, Share, Search, Cpu, Sparkles, Code2, Download, Maximize2, ShieldCheck, ArrowRightLeft } from "lucide-react";
import toast from "react-hot-toast";

// Services
import { translateCode, analyzeComplexity, optimizeCode, explainCode } from "../services/codeService";
import { runCode } from "../services/executionService";

import ExecutionConsole from "../components/ExecutionConsole";
import AIInsightsSidebar from "../components/AIInsightsSidebar";
import AIChatSidebar from "../components/AIChatSidebar";
import { Loader2 } from "lucide-react";

// Constants & Styles
import { LANGUAGES } from "../constants/languages";
import "../styles/EditorStyles.css";

const EditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL Mode (translate, ask, review)
  const queryParams = new URLSearchParams(location.search);
  const currentMode = queryParams.get("mode") || "translate";

  const setMode = (m) => {
    navigate(`/editor?mode=${m}`);
  };

  const getInitialState = (key, defaultVal, locationVal) => {
    if (locationVal) return locationVal;
    const saved = localStorage.getItem(`smartcode_${key}`);
    return saved !== null ? saved : defaultVal;
  };

  const [sourceCode, setSourceCode] = useState(() => getInitialState("sourceCode", "// Type your code here...", location.state?.code));
  const [translatedCode, setTranslatedCode] = useState(() => getInitialState("translatedCode", "", location.state?.translatedCode));
  const [sourceLang, setSourceLang] = useState(() => getInitialState("sourceLang", "javascript", location.state?.language));
  const [targetLang, setTargetLang] = useState(() => getInitialState("targetLang", "python", location.state?.targetLanguage));
  
  // AI & Execution States
  const [isProcessing, setIsProcessing] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [showConsole, setShowConsole] = useState(() => localStorage.getItem("smartcode_showConsole") === "true");
  const [isRunning, setIsRunning] = useState(false);
  const [consoleData, setConsoleData] = useState({ output: "", error: "", stdin: "" });

  // Insights Data
  const [insightType, setInsightType] = useState(null);
  const [insightData, setInsightData] = useState(null);

  useEffect(() => {
    localStorage.setItem("smartcode_sourceCode", sourceCode);
    localStorage.setItem("smartcode_translatedCode", translatedCode);
    localStorage.setItem("smartcode_sourceLang", sourceLang);
    localStorage.setItem("smartcode_targetLang", targetLang);
    localStorage.setItem("smartcode_showConsole", showConsole);
  }, [sourceCode, translatedCode, sourceLang, targetLang, showConsole]);

  useEffect(() => {
    setTranslatedCode("");
  }, [targetLang]);


  const handleAIAction = async (type, codeToProcess, language) => {
    if (!codeToProcess?.trim()) {
      toast.error("No code to process!");
      return;
    }

    setIsProcessing(true);
    setInsightType(type);
    setInsightData(null);
    
    if (type !== "translate" && currentMode !== "review") {
      setMode("review");
    }

    const controller = new AbortController();
    setAbortController(controller);
    
    try {
      if (type === "translate") {
        const response = await translateCode(sourceCode, sourceLang, targetLang, controller.signal);
        if (response.success) {
          setTranslatedCode(response.data.translatedCode);
          toast.success("Translation complete!");
        }
      } else {
        let response;
        if (type === "analyze") response = await analyzeComplexity(codeToProcess, language);
        else if (type === "optimize") response = await optimizeCode(codeToProcess, language);
        else if (type === "explain") response = await explainCode(codeToProcess, language);

        if (response.success) {
          setInsightData(response.data);
          toast.success(`Analysis ready!`);
        } else {
          toast.error(response.error || "Service unavailable.");
          setInsightData({ error: true, message: response.error });
        }
      }
    } catch (error) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        toast.error("Action canceled.");
      } else {
        toast.error("An error occurred.");
        if (type !== "translate") {
          setInsightData({ error: true, message: "Error" });
        }
      }
    } finally {
      setIsProcessing(false);
      setAbortController(null);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
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
      toast.error("Execution failed.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Layout>
      <div className="zen-editor-wrapper">
        {/* Top Bar */}
        <div className="workspace-topbar">
          <div className="segmented-control">
            <button className={`segment-btn ${currentMode === 'translate' ? 'active' : ''}`} onClick={() => setMode('translate')}>Translate</button>
            <button className={`segment-btn ${currentMode === 'ask' ? 'active' : ''}`} onClick={() => setMode('ask')}>Ask</button>
            <button className={`segment-btn ${currentMode === 'review' ? 'active' : ''}`} onClick={() => setMode('review')}>Review</button>
          </div>

          <div className="workspace-actions">
            {currentMode === "translate" && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleAIAction("translate", sourceCode, sourceLang)}
                  disabled={isProcessing}
                >
                  {isProcessing && insightType === "translate" ? "Translating..." : "Run Translate"}
                </button>
                {isProcessing && insightType === "translate" && (
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => abortController?.abort()}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
            <button className="btn btn-secondary" onClick={() => handleRun(sourceCode, sourceLang)}>
              <Play size={16} style={{ marginRight: '4px' }} /> Run Code
            </button>
            <button className="btn-icon" onClick={() => handleCopy(sourceCode)} title="Share">
              <Share size={18} color="var(--text-2)" />
            </button>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="workspace-grid">
          
          {/* Source Editor */}
          {currentMode !== "ask" && (
            <div className="editor-pane">
            <div className="pane-header">
              <div className="pane-title">
                {currentMode === "translate" && (
                  <>
                    <span>Input</span>
                    <select className="minimal-select" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                       {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                    </select>
                  </>
                )}
                {currentMode !== "translate" && (
                  <select className="minimal-select" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                     {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                  </select>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-icon" onClick={() => handleAIAction("analyze", sourceCode, sourceLang)} title="Analyze Complexity"><Cpu size={14} color="var(--text-3)"/></button>
                <button className="btn-icon" onClick={() => handleAIAction("optimize", sourceCode, sourceLang)} title="Optimize Code"><Sparkles size={14} color="var(--text-3)"/></button>
                <button className="btn-icon" onClick={() => handleAIAction("explain", sourceCode, sourceLang)} title="Explain Logic"><Search size={14} color="var(--text-3)"/></button>
              </div>
            </div>
            <div className="editor-canvas">
               <Editor
                height="100%"
                theme="vs-dark" /* We need to configure monaco theme to our v3 colors later, for now vs-dark */
                language={sourceLang}
                value={sourceCode}
                onChange={(value) => setSourceCode(value)}
                options={{ 
                  minimap: { enabled: false }, 
                  fontSize: 14, 
                  fontFamily: 'JetBrains Mono',
                  scrollBeyondLastLine: false,
                  backgroundColor: '#161513'
                }}
              />
            </div>
          </div>
          )}

          {/* Right Pane (Dynamic based on mode) */}
          {currentMode === "translate" && (
            <div className="editor-pane">
              <div className="pane-header">
                <div className="pane-title">
                  <span>Output</span>
                  <select className="minimal-select" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                     {LANGUAGES.map(lang => <option key={lang.id} value={lang.id}>{lang.name}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {translatedCode && (
                     <>
                      <button className="btn-icon" onClick={() => handleCopy(translatedCode)} title="Copy"><Copy size={14} color="var(--text-3)" /></button>
                      <button className="btn-icon" onClick={() => handleRun(translatedCode, targetLang)}><Play size={14} color="var(--text-3)" /></button>
                     </>
                  )}
                </div>
              </div>
              <div className="editor-canvas">
                {translatedCode ? (
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language={targetLang}
                    value={translatedCode}
                    options={{ 
                      minimap: { enabled: false }, 
                      fontSize: 14, 
                      fontFamily: 'JetBrains Mono',
                      scrollBeyondLastLine: false,
                      readOnly: true
                    }}
                  />
                ) : isProcessing && insightType === "translate" ? (
                  <div className="empty-state">
                    <Loader2 size={32} color="var(--accent)" className="spin" />
                    <p>Translating your code...</p>
                  </div>
                ) : (
                  <div className="empty-state">
                    <ArrowRightLeft size={32} color="var(--border-strong)" />
                    <p>Enter code and click "Run Translate"</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentMode === "ask" && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <AIChatSidebar 
                isOpen={true} 
                onClose={() => setMode('translate')}
                currentCode={sourceCode}
                currentLanguage={sourceLang}
                onApplyCode={(newCode, lang) => {
                  setSourceCode(newCode);
                  if (lang) {
                    const languageMatch = LANGUAGES.find(l => l.name.toLowerCase() === lang.toLowerCase() || l.id === lang.toLowerCase());
                    if (languageMatch) setSourceLang(languageMatch.id);
                  }
                  toast.success("Code applied to editor!");
                }}
              />
            </div>
          )}

          {currentMode === "review" && (
            <div className="workspace-sidebar">
              {(insightData || (isProcessing && insightType !== "translate")) ? (
                <AIInsightsSidebar 
                  type={insightType}
                  data={insightData}
                  loading={isProcessing}
                  onClose={() => { setInsightData(null); }}
                  onReplaceCode={(newCode) => { setSourceCode(newCode); setInsightData(null); toast.success("Optimized code applied!"); }}
                />
              ) : (
                <div className="empty-state">
                  <ShieldCheck size={32} color="var(--border-strong)" />
                  <p>Select an action (Analyze, Optimize, Explain) to review your code.</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Execution Console */}
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

      </div>
    </Layout>
  );
};

export default EditorPage;
