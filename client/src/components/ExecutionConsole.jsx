import { Terminal, Send, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ExecutionConsole = ({ 
  output, 
  error, 
  loading, 
  stdin, 
  setStdin, 
  onClear, 
  onClose,
  isRunning
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-card console-container"
    >
      <div className="console-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} color="var(--accent-cyan)" />
          <span className="font-poppins" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Output Console</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="icon-btn" onClick={onClear} title="Clear Console">
            <Trash2 size={16} />
          </button>
          <button className="icon-btn" onClick={onClose} title="Close Console">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="console-body">
        {/* 🔹 Stdin Input Section */}
        <div className="console-input-area">
          <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>❯</span>
          <input 
            type="text" 
            placeholder="Provide program input (stdin) here..." 
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className="console-stub"
            disabled={isRunning}
          />
        </div>

        {/* 🔹 Execution Logs */}
        <div className="console-logs">
          {loading && (
            <div className="log-line loading-text">Executing code on remote server...</div>
          )}
          
          {!loading && !output && !error && (
            <div className="log-line muted-text">Console ready. Click "Run" to see output.</div>
          )}

          {output && (
            <div className="log-line stdout-text">
              <pre>{output}</pre>
            </div>
          )}

          {error && (
            <div className="log-line stderr-text">
              <pre>{error}</pre>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Console Status */}
      <div className="console-footer">
        {isRunning ? (
          <span className="status-badge running">RUNNING</span>
        ) : (
          <span className="status-badge ready">READY</span>
        )}
      </div>

      <style jsx>{`
        .console-container {
          display: flex;
          flex-direction: column;
          height: 300px;
          margin-top: 20px;
          border-top: 2px solid var(--accent-cyan);
          background: rgba(10, 11, 14, 0.95) !important;
          padding: 0 !important;
          overflow: hidden;
        }

        .console-header {
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .console-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 12px;
          overflow-y: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
        }

        .console-input-area {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
        }

        .console-stub {
          background: transparent;
          border: none;
          color: var(--text-primary);
          width: 100%;
          outline: none;
        }

        .console-logs {
          flex: 1;
          line-height: 1.6;
        }

        .log-line { margin-bottom: 4px; }
        .loading-text { color: var(--accent-cyan); animation: pulse 1.5s infinite; }
        .muted-text { color: var(--text-muted); font-style: italic; }
        .stdout-text { color: #e0e0e0; }
        .stderr-text { color: #ff453a; }

        .console-footer {
          padding: 6px 16px;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
        }

        .status-badge {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 3px;
        }
        .status-badge.running { background: #ffcc00; color: #000; }
        .status-badge.ready { background: #4cd964; color: #000; }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        pre { 
          white-space: pre-wrap; 
          word-wrap: break-word; 
          margin: 0;
        }
      `}</style>
    </motion.div>
  );
};

export default ExecutionConsole;
