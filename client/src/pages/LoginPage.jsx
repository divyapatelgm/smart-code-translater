import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

// Auth context
import { useAuth } from "../context/AuthContext";

// API service
import { googleLogin } from "../services/authService";

// Styles
import "../styles/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, register } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await register(name, email, password);
        toast.success(`Welcome, ${name}!`);
      } else {
        await login(email, password);
        toast.success(`Welcome back!`);
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      localStorage.setItem("token", result.token);
      login(result.user.email, ""); 
      toast.success(`Welcome, ${result.user.name}!`);
      navigate("/");
    } catch {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="login-page-root">
      {/* 🔹 Left Side: Branding */}
      <div className="login-left">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="login-branding"
        >
          <h1>Empower Your Code. <br/> Beyond Borders.</h1>
          <p>The next-generation code translator powered by AI. Seamlessly bridge languages, maintain logic, and boost productivity.</p>
        </motion.div>
      </div>

      {/* 🔹 Right Side: Auth Form */}
      <div className="login-right">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="login-form-container"
        >
          <div className="login-form-header">
            <h2>{isSignUp ? "Join SmartCode" : "Welcome Back"}</h2>
            <p>{isSignUp ? "Start your journey with us today." : "Please enter your details to continue."}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div 
                  key="name-input"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="form-group"
                >
                  <label>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your name"
                      style={{ paddingLeft: '40px' }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  className="input-field"
                  placeholder="name@company.com"
                  style={{ paddingLeft: '40px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  style={{ paddingLeft: '40px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
              {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="toggle-auth">
            {isSignUp ? "Already have an account?" : "New to SmartCode?"}{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Create Account"}
            </span>
          </p>

          <div className="divider">Or continue with</div>

          <div className="google-btn-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed.")}
              theme="filled_black"
              shape="pill"
              width="100%"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;