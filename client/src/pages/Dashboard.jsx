import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Zap, Clock, Terminal, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Total Translations", value: "128", icon: <Zap size={20} />, color: "var(--accent-cyan)" },
    { label: "Languages Used", value: "12", icon: <Terminal size={20} />, color: "var(--accent-purple)" },
    { label: "Hours Saved", value: "84h", icon: <Clock size={20} />, color: "#4cd964" },
    { label: "Favorite Lang", value: "Python", icon: <Star size={20} />, color: "#ffcc00" },
  ];

  return (
    <Layout>
      <div className="dashboard-root">
        {/* 🔹 Welcome Hero */}
        <section className="welcome-section">
          <div className="welcome-content">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, {user?.name?.split(' ')[0]}! 🚀
            </motion.h1>
            <p>Your workspace is ready. You've translated 15 snippets this week. Keep up the momentum!</p>
          </div>
          <div className="welcome-bg"></div>
        </section>

        {/* 🔹 Stats Grid */}
        <div className="dashboard-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-card stat-card"
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
        <div className="dashboard-grid" style={{ marginTop: '40px' }}>
          <Link to="/editor" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card action-card"
            >
              <div className="action-icon">
                <Terminal size={24} />
              </div>
              <h3>Launch Editor</h3>
              <p>Translate code between 20+ languages with AI precision.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                Start Coding <ArrowRight size={18} />
              </div>
            </motion.div>
          </Link>

          <Link to="/history" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card action-card"
            >
              <div className="action-icon" style={{ color: 'var(--accent-purple)' }}>
                <Clock size={24} />
              </div>
              <h3>Translation History</h3>
              <p>Review and export your previously translated code snippets.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: 600 }}>
                View History <ArrowRight size={18} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
