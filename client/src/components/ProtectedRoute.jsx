import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  // Get user + loading state from AuthContext
  const { user, loading } = useAuth();

  // 🔄 While checking authentication (on app load)
  if (loading) {
    return (
      <div className="loading-container">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // ❌ If no user → redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ If user exists → allow access
  return <div className="protected-shell">{children}</div>;
};

export default ProtectedRoute;