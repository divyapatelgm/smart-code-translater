import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Clock, ArrowRight, Trash2, ExternalLink, Inbox, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import "../styles/history.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mock fetch for UI stability while backend is being aligned
    setTimeout(() => {
      setHistory([
        { id: 1, from: "JavaScript", to: "Python", preview: 'console.log("Hello World");', timestamp: "2 hours ago" },
        { id: 2, from: "Java", to: "TypeScript", preview: "public class Main { public static void main...", timestamp: "Yesterday" },
        { id: 3, from: "Python", to: "C++", preview: 'print(f"Data process: {result}")', timestamp: "Apr 14, 2026" }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const deleteItem = (id) => {
    setHistory(history.filter(item => item.id !== id));
    toast.success("Record removed from history");
  };

  const filteredHistory = history.filter(item => 
    item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="history-page-header">
        <h2 className="font-poppins">Translation History</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Keep track of your previous code translations and reusable snippets.</p>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="glass-input" 
              style={{ paddingLeft: '36px', width: '250px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="history-container">
        {loading ? (
          <div className="empty-state"><h3>Loading history...</h3></div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card history-card"
                >
                  <div className="history-info">
                    <div className="history-langs">
                      <span>{item.from}</span>
                      <ArrowRight size={16} color="var(--accent-cyan)" />
                      <span>{item.to}</span>
                    </div>
                    <div className="history-meta">
                      <span className="history-preview">{item.preview}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {item.timestamp}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-outline" style={{ padding: '8px' }} title="Open in Editor">
                      <ExternalLink size={18} />
                    </button>
                    <button 
                      className="btn-outline" 
                      style={{ padding: '8px', color: '#ff453a' }} 
                      title="Delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <div className="empty-icon">
                  <Inbox size={40} />
                </div>
                <h3>No history found</h3>
                <p>Start translating your code snippets to see them here.</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;