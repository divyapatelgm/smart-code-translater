import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "?");
  
  // Note: we can use query params to start editor in a specific mode, e.g. /editor?mode=translate
  const isModeActive = (mode) => location.pathname === "/editor" && location.search.includes(`mode=${mode}`);

  const aiQuotaUsed = user?.aiRequestsCount || 0;
  const aiQuotaLimit = 50;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-logo">
          <span>&lt;/&gt;</span> SmartCode
        </Link>

        <div className="navbar-links">
          <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
            Dashboard
          </Link>
          <Link to="/editor?mode=translate" className={isModeActive("translate") || (isActive("/editor") && !location.search) ? "active" : ""}>
            Translate
          </Link>
          <Link to="/editor?mode=ask" className={isModeActive("ask") ? "active" : ""}>
            Ask
          </Link>
          <Link to="/editor?mode=review" className={isModeActive("review") ? "active" : ""}>
            Review
          </Link>
          <Link to="/history" className={isActive("/history") ? "active" : ""}>
            History
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className="quota-chip">
          {aiQuotaUsed}/{aiQuotaLimit} requests
        </div>

        <div className="user-profile">
          {user?.picture ? (
            <img src={user.picture} alt="profile" className="navbar-avatar" />
          ) : (
            <div className="navbar-avatar-placeholder">
              <UserIcon size={18} />
            </div>
          )}
        </div>

        <button className="navbar-logout" onClick={handleLogout} title="Logout" aria-label="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;