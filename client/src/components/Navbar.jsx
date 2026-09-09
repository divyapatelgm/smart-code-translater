import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Code, History, User as UserIcon } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <Code size={26} color="#00d2ff" className="logo-icon" />
          <span>SmartCode</span>
        </Link>

        <div className="navbar-links">
          <Link to="/editor" className={isActive("/editor") ? "active" : ""}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code size={18} /> Editor
            </div>
          </Link>
          <Link to="/history" className={isActive("/history") ? "active" : ""}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <History size={18} /> History
            </div>
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          {user?.picture ? (
            <img src={user.picture} alt="profile" className="navbar-avatar" />
          ) : (
            <div className="navbar-avatar-placeholder">
              <UserIcon size={18} />
            </div>
          )}
          <span className="navbar-username">{user?.name || 'Developer'}</span>
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