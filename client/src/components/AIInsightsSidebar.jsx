import { motion } from "framer-motion";
import { X, Zap, Cpu, Search, Sparkles, Check, Info } from "lucide-react";
import LogicStepper from "./LogicStepper";

const AIInsightsSidebar = ({ type, data, onClose, onReplaceCode }) => {
  const renderContent = () => {
    switch (type) {
      case "analyze":
        return (
          <div className="insight-content">
            <div className="complexity-grid">
              <div className="complexity-card">
                <Zap size={20} color="var(--accent-cyan)" />
                <span className="label">Time Complexity</span>
                <span className="value">{data.timeComplexity || "N/A"}</span>
              </div>
              <div className="complexity-card">
                <Cpu size={20} color="var(--accent-purple)" />
                <span className="label">Space Complexity</span>
                <span className="value">{data.spaceComplexity || "N/A"}</span>
              </div>
            </div>
            <div className="explanation-section card-box">
              <div className="box-header"><Info size={16} /> <span>Analysis Details</span></div>
              <p>{data.explanation}</p>
            </div>
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
            {type === "analyze" && "Compute Complexity"}
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
