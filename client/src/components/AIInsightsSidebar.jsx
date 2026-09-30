import { motion } from "framer-motion";
import { X, Zap, Cpu, Search, Sparkles, Check, Info, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import LogicStepper from "./LogicStepper";

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="collapsible-section card-box" style={{ padding: "16px 20px" }}>
      <div 
        className="box-header" 
        style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", marginBottom: isOpen ? "15px" : "0", margin: 0 }} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Info size={16} /> <span>{title}</span>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isOpen && <div className="collapsible-content" style={{ marginTop: "15px" }}>{children}</div>}
    </div>
  );
};

const AIInsightsSidebar = ({ type, data, loading, onClose, onReplaceCode }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="insight-content loading-state">
          <div className="shimmer-grid">
            <div className="shimmer-box"></div>
            <div className="shimmer-box"></div>
          </div>
          <div className="shimmer-text"></div>
          <div className="shimmer-text short"></div>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "20px" }}>Analyzing code logic...</p>
        </div>
      );
    }

    if (data?.error) {
      return (
        <div className="insight-content error-state">
          <div className="empty-state">
            <AlertTriangle size={40} color="#ff453a" />
            <p>Unable to analyze this code.</p>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{data.message}</span>
            <button className="btn-outline" style={{ marginTop: "20px" }} onClick={onClose}>Try Again</button>
          </div>
        </div>
      );
    }

    if (!data) {
       return (
         <div className="empty-state">
           <p>Add code to the editor to calculate insights.</p>
         </div>
       );
    }

    switch (type) {
      case "analyze":
        return (
          <div className="insight-content">
            <div className="complexity-grid">
              <div className="complexity-card">
                <Zap size={20} color="var(--accent-cyan)" />
                <span className="label">TIME COMPLEXITY</span>
                <span className="value">{data.complexity?.time || "O(1)"}</span>
              </div>
              <div className="complexity-card">
                <Cpu size={20} color="var(--accent-purple)" />
                <span className="label">SPACE COMPLEXITY</span>
                <span className="value">{data.complexity?.space || "O(1)"}</span>
              </div>
            </div>

            <div className="explanation-section card-box" style={{ padding: "16px 20px" }}>
              <div className="box-header" style={{ marginBottom: "15px" }}>
                <Sparkles size={16} color="var(--accent-cyan)" /> <span>AI Code Review</span>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  {data.summary}
                </p>
              </div>
            </div>

            {data.issues && data.issues.length > 0 ? (
              <CollapsibleSection title={`Detected Issues (${data.issues.length})`} defaultOpen={true}>
                {data.issues.map((issue, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: "12px", 
                    padding: "12px", 
                    background: "rgba(255,255,255,0.03)", 
                    borderRadius: "8px", 
                    borderLeft: `3px solid ${issue.severity === 'critical' ? '#ff453a' : issue.severity === 'major' ? '#ff9f0a' : '#ffd60a'}` 
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)" }}>
                        {issue.type} • Line {issue.line || "?"}
                      </span>
                      <span style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.1)" }}>
                        {issue.severity}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.9rem", marginBottom: "8px" }}>{issue.description}</p>
                    <div style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", display: "flex", gap: "6px", alignItems: "flex-start" }}>
                      <Info size={14} style={{ marginTop: "2px", flexShrink: 0 }} />
                      <span>{issue.suggestion}</span>
                    </div>
                  </div>
                ))}
              </CollapsibleSection>
            ) : (
              <div className="explanation-section card-box" style={{ padding: "16px 20px", display: "flex", gap: "10px", alignItems: "center", color: "#4cd964" }}>
                <Check size={20} />
                <span style={{ fontSize: "0.95rem", fontWeight: "500" }}>No major issues detected! Your code looks great.</span>
              </div>
            )}
          </div>
        );

      case "optimize":
        return (
          <div className="insight-content">
            <div className="code-preview-box card-box">
               <div className="box-header" style={{ color: 'var(--accent-cyan)' }}>
                <Sparkles size={16} /> <span>Optimized Logic</span>
              </div>
              <pre><code>{data.optimizedCode}</code></pre>
              <div className="preview-actions">
                <button className="btn-replace" onClick={() => onReplaceCode(data.optimizedCode)}>
                  <Check size={16} /> Apply Optimization
                </button>
              </div>
            </div>
            <div className="suggestions-box card-box">
              <div className="box-header"><span>What changed?</span></div>
              <p>{data.suggestions}</p>
            </div>
          </div>
        );

      case "explain":
        return (
          <div className="insight-content">
             <div className="explanation-section">
                <LogicStepper steps={data} />
             </div>
          </div>
        );

      case "assistant":
        return (
          <div className="insight-content">
             <div className="suggestions-box card-box" style={{ marginBottom: '16px' }}>
                <div className="box-header" style={{ color: 'var(--accent-purple)' }}>
                  <Sparkles size={16} /> <span>SmartCode Response</span>
                </div>
                {data.intent && <div style={{ marginBottom: '8px', fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase' }}>Intent: {data.intent}</div>}
                {data.explanation && <p style={{ fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', color: 'rgba(255, 255, 255, 0.85)' }}>{data.explanation}</p>}
             </div>
             
             {data.suggestions && data.suggestions.length > 0 && (
                <div className="suggestions-box card-box" style={{ marginBottom: '16px' }}>
                  <div className="box-header" style={{ color: 'var(--accent-cyan)' }}>
                    <Info size={16} /> <span>Suggestions</span>
                  </div>
                  <ul style={{ paddingLeft: '20px' }}>
                     {data.suggestions.map((s, i) => <li key={i} style={{ marginBottom: '8px' }}>{s}</li>)}
                  </ul>
                </div>
             )}

             {data.warnings && data.warnings.length > 0 && (
                <div className="suggestions-box card-box">
                  <div className="box-header" style={{ color: '#ff453a' }}>
                    <AlertTriangle size={16} /> <span>Warnings</span>
                  </div>
                  <ul style={{ paddingLeft: '20px' }}>
                     {data.warnings.map((w, i) => <li key={i} style={{ marginBottom: '8px', color: '#ffaaa5' }}>{w}</li>)}
                  </ul>
                </div>
             )}
          </div>
        );

      default:
        return <p>No insights found.</p>;
    }
  };

  return (
    <motion.div 
      initial={{ x: "100%", opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
      className="ai-insights-sidebar"
    >
      <div className="sidebar-header">
        <div className="title-area">
           <div className="dot-indicator"></div>
           <h3 className="font-poppins">
            {type === "analyze" && "AI Code Review"}
            {type === "optimize" && "Refactor Lab"}
            {type === "explain" && "Logic Mastery"}
            {type === "assistant" && "Assistant Insights"}
          </h3>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close Sidebar">
          <X size={20} />
        </button>
      </div>

      <div className="sidebar-scrollable">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default AIInsightsSidebar;
