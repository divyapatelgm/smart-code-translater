import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightLeft, MessageSquare, ShieldCheck, Search, Mic, Share2, ChevronRight, FileCode2, Code2, Globe, Star } from "lucide-react";
import { getHistory } from "../services/historyService";
import "../styles/dashboard.css";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getHistory(1, 100); 
        const historyArray = response?.data?.entries || response?.data || [];
        setHistory(Array.isArray(historyArray) ? historyArray : []);
      } catch (err) {
        console.error("Failed to fetch history");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalTranslations = history.length;
  const languagesSet = new Set();
  const languageCounts = {};
  
  if (Array.isArray(history)) {
    history.forEach(item => {
      if (item.sourceLanguage) {
        languagesSet.add(item.sourceLanguage);
        languageCounts[item.sourceLanguage] = (languageCounts[item.sourceLanguage] || 0) + 1;
      }
      if (item.targetLanguage) {
        languagesSet.add(item.targetLanguage);
        languageCounts[item.targetLanguage] = (languageCounts[item.targetLanguage] || 0) + 1;
      }
    });
  }
  
  const favoriteLang = Object.keys(languageCounts).length > 0 
    ? Object.keys(languageCounts).reduce((a, b) => languageCounts[a] > languageCounts[b] ? a : b) 
    : "None";

  const recentHistory = history.slice(0, 3);

  const features = [
    { id: "translate", title: "Translate", desc: "Python in, Rust out. Logic intact.", icon: <ArrowRightLeft size={20} />, link: "/editor?mode=translate" },
    { id: "ask", title: "Ask", desc: "Say what you want. We pick the mode.", icon: <MessageSquare size={20} />, link: "/editor?mode=ask" },
    { id: "review", title: "Review", desc: "Bugs, security holes and slow paths.", icon: <ShieldCheck size={20} />, link: "/editor?mode=review" },
    { id: "search", title: "Semantic search", desc: "Find past code by meaning.", icon: <Search size={20} />, link: "/history" },
    { id: "voice", title: "Voice", desc: "Describe the function, watch it appear.", icon: <Mic size={20} />, link: "/editor?mode=ask" },
    { id: "run", title: "Run & share", desc: "Run in browser or share link.", icon: <Share2 size={20} />, link: "/editor" }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div style={{ color: 'var(--text-3)' }}>Loading Dashboard...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-root">
        {/* Welcome Section */}
        <section className="welcome-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="welcome-content">
            <h1 style={{ fontSize: '40px' }}>Welcome back, {user?.name?.split(' ')[0] || 'Developer'}</h1>
            <p style={{ color: 'var(--text-2)' }}>You've translated {totalTranslations} snippets across {languagesSet.size} languages.</p>
          </div>
          
          {user?.quota && (
            <div className="quota-ring" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--surface-2)', padding: '16px 24px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)' }}>
              <div style={{ position: 'relative', width: '32px', height: '32px', borderRadius: '50%', background: `conic-gradient(var(--accent) ${Math.round((user.quota.remaining / user.quota.limit) * 100)}%, transparent 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '28px', height: '28px', background: 'var(--surface-2)', borderRadius: '50%' }}></div>
              </div>
              <div>
                <div style={{ fontWeight: '500' }}>{user.quota.remaining} of {user.quota.limit} left today</div>
                <div style={{ fontSize: '13px', color: 'var(--text-3)' }}>resets {formatDistanceToNow(new Date(user.quota.resetsAt))}</div>
              </div>
            </div>
          )}
        </section>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="card stat-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="stat-icon-wrapper" style={{ width: '40px', height: '40px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={20} />
            </div>
            <div>
              <div className="stat-value" style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.1' }}>{totalTranslations}</div>
              <div className="stat-label" style={{ fontSize: '14px', color: 'var(--text-3)', marginTop: '4px' }}>Translations</div>
            </div>
          </div>
          <div className="card stat-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="stat-icon-wrapper" style={{ width: '40px', height: '40px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} />
            </div>
            <div>
              <div className="stat-value" style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.1' }}>{languagesSet.size}</div>
              <div className="stat-label" style={{ fontSize: '14px', color: 'var(--text-3)', marginTop: '4px' }}>Languages Used</div>
            </div>
          </div>
          <div className="card stat-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="stat-icon-wrapper" style={{ width: '40px', height: '40px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={20} />
            </div>
            <div>
              <div className="stat-value" style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.1', textTransform: 'capitalize' }}>{favoriteLang}</div>
              <div className="stat-label" style={{ fontSize: '14px', color: 'var(--text-3)', marginTop: '4px' }}>Favorite Language</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="dashboard-features">
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              className="card feature-card" 
              to={feature.link}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', outline: 'none' }}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 style={{ marginBottom: '4px', color: 'var(--text)' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>{feature.desc}</p>
              
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-3)' }}>
                  {user?.featureUsage?.[feature.id] 
                    ? `Last used ${formatDistanceToNow(new Date(user.featureUsage[feature.id]))} ago` 
                    : 'Never used'}
                </span>
                <span className="feature-card-action">Open <ChevronRight size={14} className="feature-card-arrow" /></span>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="dashboard-history">
          <div className="dashboard-history-header">
            <h2 className="dashboard-history-title">Recent Activity</h2>
            <Link to="/history" className="btn btn-ghost" style={{ padding: '0 8px' }}>
              View all
            </Link>
          </div>
          
          <div className="history-list">
            {recentHistory.length > 0 ? recentHistory.map((item) => {
              const intent = (item.intent || 'translate').toLowerCase();
              return (
              <Link to={`/history?id=${item._id}`} key={item._id} className="history-item" style={{ height: '56px', display: 'flex', alignItems: 'center', padding: '0 16px', textDecoration: 'none', borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                <div className="history-item-left" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="history-item-intent" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', color: 'var(--text-2)', textTransform: 'capitalize', width: '80px', textAlign: 'center' }}>
                    {intent}
                  </div>
                  <div className="history-item-details" style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div className="history-item-title" style={{ color: 'var(--text)', fontSize: '14px', fontWeight: '500' }}>
                      {intent === 'ask' 
                        ? `Ask → ${item.prompt?.substring(0, 30) || 'Question'}...`
                        : `${item.sourceLanguage ? item.sourceLanguage.charAt(0).toUpperCase() + item.sourceLanguage.slice(1) : "Unknown"} → ${item.targetLanguage ? item.targetLanguage.charAt(0).toUpperCase() + item.targetLanguage.slice(1) : "Unknown"}`}
                    </div>
                  </div>
                  <div className="history-item-meta" style={{ fontSize: '13px', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                    {item.createdAt ? formatDistanceToNow(new Date(item.createdAt)) + ' ago' : 'Recently'}
                  </div>
                </div>
              </Link>
            )}) : (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-3)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                No recent activity. Launch the editor to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
