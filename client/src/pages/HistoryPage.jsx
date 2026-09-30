import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Search, Trash2, ExternalLink, Share2, Check, Inbox } from "lucide-react";
import toast from "react-hot-toast";
import { getHistory, deleteHistoryItem, shareSnippet } from "../services/historyService";
import { formatDistanceToNow } from "date-fns";
import "../styles/history.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchHistory = async () => {
      setLoading(true);
      setSearchError("");
      try {
        const result = await getHistory(1, 20, searchQuery, controller.signal);
        setHistory(result?.data?.entries || []);
      } catch (error) {
        if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
          setSearchError("Failed to search history. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    
    // Only search if empty or >= 2 chars
    if (searchQuery.trim().length === 0 || searchQuery.trim().length >= 2) {
      const delayDebounceFn = setTimeout(() => {
        fetchHistory();
      }, 300);
      return () => {
        clearTimeout(delayDebounceFn);
        controller.abort();
      };
    } else {
      // 1 char typed, wait until they type more
      return () => controller.abort();
    }
  }, [searchQuery]);

  const deleteItem = async (id) => {
    try {
      await deleteHistoryItem(id);
      setHistory(history.filter(item => (item._id || item.id) !== id));
      toast.success("Record removed from history");
    } catch (error) {
      toast.error("Failed to delete record");
    }
  };

  const handleOpenInEditor = (item) => {
    navigate("/editor?mode=translate", {
      state: {
        code: item.inputCode || item.prompt || "",
        language: item.sourceLanguage || "javascript",
        translatedCode: item.output?.translatedCode || item.output?.code || (typeof item.output === "string" ? item.output : ""),
        targetLanguage: item.targetLanguage || "python"
      }
    });
  };

  const handleShare = async (item) => {
    try {
      const id = item._id || item.id;
      if (!item.isPublic) {
        await shareSnippet(id);
        setHistory(prev => prev.map(h => (h._id || h.id) === id ? { ...h, isPublic: true } : h));
      }
      const shareUrl = `${window.location.origin}/snippet/${id}`;
      await navigator.clipboard.writeText(shareUrl);
      
      setCopiedId(id);
      toast.success("Public link copied!");
      
      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    } catch (error) {
      toast.error("Failed to share snippet");
    }
  };

  return (
    <Layout>
      <div className="history-page-header">
        <div>
          <h1 className="history-title">History</h1>
          <p className="history-subtitle">Everything you've translated, asked and reviewed.</p>
        </div>
        
        <div className="history-search-wrapper">
          <div className="history-search-container">
            <Search size={18} className="history-search-icon" />
            <input 
              type="text" 
              placeholder="Search by what the code does — try 'auth logic'" 
              className="input-field" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="semantic-badge">Semantic</span>
          </div>
          {searchError && <div className="search-error" style={{ color: 'var(--error)', marginTop: '8px', fontSize: '14px' }}>{searchError}</div>}
          
          <div className="history-filters">
            {["all", "translate", "ask", "review"].map(f => (
              <button 
                key={f} 
                className={`filter-chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="history-container">
        {loading ? (
          <div className="empty-state-history">Loading history...</div>
        ) : history.length > 0 ? (
          history.filter(item => filter === "all" || (item.type || item.intent || 'translate').toLowerCase() === filter).map((item, index) => {
            const titleText = item.title || (item.intent?.toLowerCase() === "ask" ? `Ask → ${item.prompt}` : `${item.sourceLanguage} → ${item.targetLanguage}`);
            const previewText = item.preview || item.prompt || item.inputCode || "No preview";
            const scoreText = item.similarityScore ? `Matched: ${Math.round(item.similarityScore * 100)}%` : null;

            return (
            <div key={item._id || item.id || index} className="history-card">
              <div className="history-info">
                <div className="history-title-row">
                  {titleText}
                </div>
                <div className="history-preview">
                  {previewText}
                </div>
                {scoreText && (
                  <div className="history-match-score" style={{ color: 'var(--accent)', fontSize: '12px', marginTop: '4px' }}>
                    {scoreText}
                  </div>
                )}
              </div>
              
              <div className="history-timestamp">
                {item.createdAt ? formatDistanceToNow(new Date(item.createdAt)) + ' ago' : 'Recently'}
              </div>

              <div className="history-actions">
                <button 
                  className="btn btn-ghost btn-icon" 
                  title={item.isPublic ? "Copy Link" : "Share Snippet"}
                  onClick={() => handleShare(item)}
                >
                  {copiedId === (item._id || item.id) ? <Check size={18} color="var(--success)" /> : <Share2 size={18} />}
                </button>
                <button 
                  className="btn btn-ghost btn-icon" 
                  title="Open in Editor"
                  onClick={() => handleOpenInEditor(item)}
                >
                  <ExternalLink size={18} />
                </button>
                <button 
                  className="btn btn-ghost btn-icon delete-btn" 
                  title="Delete"
                  onClick={() => deleteItem(item._id || item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })
        ) : (
          <div className="empty-state-history">
            <Inbox size={40} style={{ marginBottom: '16px' }} />
            <h3 style={{ marginBottom: '8px', color: 'var(--text)' }}>No history found</h3>
            <p>Start translating your code snippets to see them here.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;