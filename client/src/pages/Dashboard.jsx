import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Zap, Clock, Terminal, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Total Translations", value: "128", icon: <Zap size={22} />, color: "var(--accent-cyan)" },
    { label: "Languages Used", value: "12", icon: <Terminal size={22} />, color: "var(--accent-purple)" },
    { label: "Hours Saved", value: "84h", icon: <Clock size={22} />, color: "#4cd964" },
    { label: "Favorite Lang", value: "Python", icon: <Star size={22} />, color: "#ffcc00" },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Layout>
      <div className="dashboard-root fade-in">
        {/* 🔹 Welcome Hero */}
        <section className="welcome-section">
          <div className="welcome-bg"></div>
          <div className="welcome-content">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Welcome back, {user?.name?.split(' ')[0] || 'Developer'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Your workspace is ready. You've translated 15 snippets this week. Keep up the momentum!
            </motion.p>
          </div>
        </section>

        {/* 🔹 Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              className="glass-card stat-card"
              onMouseMove={handleMouseMove}
              style={{ '--hover-color': stat.color }}
            >
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* 🔹 Quick Actions */}
        <div className="actions-grid">
          <Link to="/editor" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card action-card"
              style={{ '--hover-shadow': 'rgba(0, 210, 255, 0.2)', '--hover-border': 'rgba(0, 210, 255, 0.4)', '--hover-bg': 'var(--accent-cyan)' }}
            >
              <div className="action-icon" style={{ color: 'var(--accent-cyan)' }}>
                <Terminal size={24} />
              </div>
              <h3>Launch Editor</h3>
              <p>Translate code between 20+ languages with AI precision. Fix bugs and understand legacy code instantly.</p>
              <div className="action-link" style={{ color: 'var(--accent-cyan)' }}>
                Start Coding <ArrowRight className="action-arrow" size={18} />
              </div>
            </motion.div>
          </Link>

          <Link to="/history" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card action-card"
              style={{ '--hover-shadow': 'rgba(157, 80, 187, 0.2)', '--hover-border': 'rgba(157, 80, 187, 0.4)', '--hover-bg': 'var(--accent-purple)' }}
            >
              <div className="action-icon" style={{ color: 'var(--accent-purple)' }}>
                <Clock size={24} />
              </div>
              <h3>Translation History</h3>
              <p>Review and export your previously translated code snippets. Never lose your important work.</p>
              <div className="action-link" style={{ color: 'var(--accent-purple)' }}>
                View History <ArrowRight className="action-arrow" size={18} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
