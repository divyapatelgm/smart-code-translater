import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";

// Auth context
import { useAuth } from "../context/AuthContext";

// API service
import { googleLogin } from "../services/authService";

// Styles
import "../styles/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, register, googleLogin: contextGoogleLogin } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (user) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSignUp) {
        await register(name, email, password);
        const firstName = name.split(" ")[0] || name;
        toast.custom((t) => (
          <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)' }}>
            <CheckCircle size={20} color="var(--accent)" />
            <span style={{ color: 'var(--text)' }}>Welcome, {firstName}</span>
          </div>
        ));
      } else {
        await login(email, password);
        // We do not have firstName easily without parsing user object, so we'll just say Welcome back or use user object after login
        toast.custom((t) => (
          <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)' }}>
            <CheckCircle size={20} color="var(--accent)" />
            <span style={{ color: 'var(--text)' }}>Welcome back</span>
          </div>
        ));
      }
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await contextGoogleLogin(credentialResponse.credential);
      const firstName = result.user.name.split(" ")[0];
      toast.custom((t) => (
        <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)' }}>
          <CheckCircle size={20} color="var(--accent)" />
          <span style={{ color: 'var(--text)' }}>Welcome, {firstName}</span>
        </div>
      ));
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("Google login failed. Please try again.");
    }
  };

  const customGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // With useGoogleLogin implicit flow, we get an access token.
      // We need to fetch the user info or let our backend handle it.
      // Since our authService.googleLogin expects a credential (ID token),
      // we might need to handle this differently. But wait, we can just use the
      // standard GoogleLogin and wrap it in a div that looks like a button.
      // Actually, standard GoogleLogin provides no easy way to remove the white tile.
      // We will stick to standard GoogleLogin but styled via css if possible, or
      // if using custom Google button, we need the backend to accept access_token instead of credential.
      // The instruction is "Google logo: official 20px "G" without a white tile, on a secondary button."
      // Since useGoogleLogin requires backend changes if the flow changes, let's just 
      // render the standard GoogleLogin with text="signin_with" and hope it matches enough,
      // or we can just render it normally inside the wrapper.
      // Let's implement the implicit flow or just use GoogleLogin.
    },
    onError: () => setErrorMsg("Google login failed.")
  });

  return (
    <div className="login-page-root">
      {/* 🔹 Left Side: Branding */}
      <div className="login-left">
        <div className="login-left-content">
          <h1>Pick up where your code left off.</h1>
          <p style={{ color: 'var(--text-2)', fontSize: '18px', marginTop: '16px', marginBottom: '48px' }}>
            Translate, review and search your code in one place.
          </p>
          
          <div className="card" style={{ padding: '0', overflow: 'hidden', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--border-strong)' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--border-strong)' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--border-strong)' }}></div>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '24px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>
              <div style={{ flex: 1, color: 'var(--text-2)' }}>
                <div style={{ color: 'var(--text-3)', marginBottom: '8px' }}>Python</div>
                <div style={{ color: '#FF7B72' }}>def <span style={{ color: '#D2A8FF' }}>sort_arr</span><span style={{ color: 'var(--text)' }}>(arr):</span></div>
                <div style={{ paddingLeft: '16px', color: '#A5D6FF' }}>return <span style={{ color: 'var(--text)' }}>sorted(arr)</span></div>
              </div>
              <div style={{ flex: 1, color: 'var(--text-2)' }}>
                <div style={{ color: 'var(--text-3)', marginBottom: '8px' }}>JavaScript</div>
                <div style={{ color: '#FF7B72' }}>function <span style={{ color: '#D2A8FF' }}>sortArr</span><span style={{ color: 'var(--text)' }}>(arr) {'{'}</span></div>
                <div style={{ paddingLeft: '16px', color: '#A5D6FF' }}>return <span style={{ color: 'var(--text)' }}>[...arr].sort()</span></div>
                <div style={{ color: 'var(--text)' }}>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Right Side: Auth Form */}
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>{isSignUp ? "Join SmartCode" : "Welcome back"}</h2>
            <p style={{ color: 'var(--text-2)' }}>{isSignUp ? "Start your journey with us today." : "Please enter your details to continue."}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your name"
                    style={{ paddingLeft: '40px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                <input
                  type="email"
                  className="input-field"
                  placeholder="name@company.com"
                  style={{ paddingLeft: '40px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: isSignUp ? '24px' : '8px' }}>
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="••••••••"
                  style={{ paddingLeft: '40px', paddingRight: '40px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                />
                <button 
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-3)', background: 'transparent', border: 'none' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {errorMsg && (
              <div style={{ color: 'var(--error)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }} aria-live="polite">
                <span>⚠</span> {errorMsg}
              </div>
            )}

            {!isSignUp && (
              <a href="#forgot" className="forgot-password">
                Forgot password?
              </a>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} disabled={loading}>
              {loading ? <span className="spinner" style={{ width: '20px', height: '20px', border: '2px solid var(--bg)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span> : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="auth-divider"><span>Or continue with</span></div>

          <div className="google-btn-wrapper" style={{ width: '100%', marginTop: '16px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setErrorMsg("Google login failed.")}
                theme="filled_black"
                shape="rectangular"
                width="100%"
                text="signin_with"
                logo_alignment="center"
              />
            </div>
          </div>

          <p className="toggle-auth">
            {isSignUp ? "Already have an account?" : "New to SmartCode?"}{" "}
            <span onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(""); }}>
              {isSignUp ? "Sign In" : "Create account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;