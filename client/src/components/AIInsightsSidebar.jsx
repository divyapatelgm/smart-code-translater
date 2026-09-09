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
                <span className="value">{data.timeComplexity || "O(1)"}</span>
              </div>
              <div className="complexity-card">
                <Cpu size={20} color="var(--accent-purple)" />
                <span className="label">SPACE COMPLEXITY</span>
                <span className="value">{data.spaceComplexity || "O(1)"}</span>
              </div>
            </div>

            <div className="explanation-section card-box" style={{ padding: "16px 20px" }}>
              <div className="box-header" style={{ marginBottom: "15px" }}><Info size={16} /> <span>Analysis Details</span></div>
              <div style={{ marginBottom: "12px" }}>
                <span className="label" style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Why this complexity?</span>
                <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.95rem", lineHeight: "1.5" }}>{data.explanation}</p>
              </div>
              
              {data.operations && data.operations.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <span className="label" style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Operations</span>
                  <ul style={{ paddingLeft: "20px", marginTop: "8px", fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.5" }}>
                    {data.operations.map((op, idx) => <li key={idx} style={{ marginBottom: "4px" }}>{op}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {(data.breakdown?.length > 0 || data.spaceBreakdown?.length > 0 || data.bestCase || data.averageCase || data.worstCase) && (
              <CollapsibleSection title="Detailed Breakdown">
                {data.breakdown && data.breakdown.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                     <span className="label" style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)" }}>Loop / Time Breakdown</span>
                     <div style={{ marginTop: "8px" }}>
                        {data.breakdown.map((item, idx) => (
                           <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "0.95rem" }}>
                             <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{item.title}</span>
                             <span style={{ fontWeight: "bold" }}>{item.description}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                )}
                
                {data.spaceBreakdown && data.spaceBreakdown.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                     <span className="label" style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)" }}>Space Breakdown</span>
                     <div style={{ marginTop: "8px" }}>
                        {data.spaceBreakdown.map((item, idx) => (
                           <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "0.95rem" }}>
                             <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{item.title}</span>
                             <span style={{ fontWeight: "bold" }}>{item.description}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                )}

                {(data.bestCase || data.worstCase) && (
                   <div style={{ marginBottom: "8px" }}>
                     <span className="label" style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)" }}>Case Analysis</span>
                     <div style={{ marginTop: "8px" }}>
                        {data.bestCase && (
                           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "0.95rem" }}>
                             <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>Best Case</span>
                             <span style={{ fontWeight: "bold" }}>{data.bestCase}</span>
                           </div>
                        )}
                        {data.averageCase && (
                           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "0.95rem" }}>
                             <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>Average Case</span>
                             <span style={{ fontWeight: "bold" }}>{data.averageCase}</span>
                           </div>
                        )}
                        {data.worstCase && (
                           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "0.95rem" }}>
                             <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>Worst Case</span>
                             <span style={{ fontWeight: "bold" }}>{data.worstCase}</span>
                           </div>
                        )}
                     </div>
                   </div>
                )}
              </CollapsibleSection>
            )}

            {(data.assumptions || data.technicalNotes) && (
              <CollapsibleSection title="Technical Notes">
                {data.assumptions && (
                  <div style={{ marginBottom: "12px" }}>
                     <span className="label" style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)" }}>Assumptions</span>
                     <p style={{ marginTop: "4px", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.6)", lineHeight: "1.5" }}>{data.assumptions}</p>
                  </div>
                )}
                {data.technicalNotes && (
                  <div>
                     <span className="label" style={{ fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)" }}>Language Caveats</span>
                     <p style={{ marginTop: "4px", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.6)", lineHeight: "1.5" }}>{data.technicalNotes}</p>
                  </div>
                )}
              </CollapsibleSection>
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
            {type === "analyze" && "Complexity Analysis"}
            {type === "optimize" && "Refactor Lab"}
            {type === "explain" && "Logic Mastery"}
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
