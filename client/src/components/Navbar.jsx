import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Code, History, User as UserIcon } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <Code size={28} color="#00d2ff" />
          SmartCode
        </Link>

        <div className="navbar-links">
          <Link to="/editor">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code size={18} /> Editor
            </div>
          </Link>
          <Link to="/history">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <History size={18} /> History
            </div>
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user?.picture ? (
            <img src={user.picture} alt="profile" className="navbar-avatar" />
          ) : (
            <div className="navbar-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <UserIcon size={20} />
            </div>
          )}
          <span className="navbar-username">{user?.name}</span>
        </div>

        <button className="navbar-logout" onClick={handleLogout} title="Logout">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;