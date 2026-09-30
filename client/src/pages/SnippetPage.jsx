import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicSnippet } from "../services/historyService";
import { Code2, ArrowRight, Clock, User as UserIcon, Copy, Terminal } from "lucide-react";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";

const SnippetPage = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const data = await getPublicSnippet(id);
        setSnippet(data.data || data);
      } catch (err) {
        setError("Snippet not found or is private.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSnippet();
  }, [id]);

  const handleCopy = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Copied to clipboard!");
      }
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a', color: 'white' }}>
        <Terminal size={32} className="pulse-icon" style={{ color: 'var(--accent-cyan)', marginRight: '16px' }} /> 
        <h2>Loading Snippet...</h2>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a', color: 'white' }}>
        <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <h2>404 - Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '16px 0 24px' }}>{error || "This snippet doesn't exist or isn't public."}</p>
          <Link to="/" className="action-btn main" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Go to SmartCode
          </Link>
        </div>
      </div>
    );
  }

  const translatedText = snippet.output?.translatedCode || snippet.output?.code || (typeof snippet.output === "string" ? snippet.output : "");

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white', fontWeight: '700', fontSize: '1.2rem' }}>
          <Code2 size={24} color="#00d2ff" /> SmartCode
        </Link>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/login" className="action-btn secondary" style={{ textDecoration: 'none' }}>Login</Link>
          <Link to="/" className="action-btn main" style={{ textDecoration: 'none' }}>Create Your Own</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ marginBottom: '12px', fontSize: '2rem' }}>
            {snippet.sourceLanguage || "Code"} <ArrowRight size={20} style={{ margin: '0 12px', color: 'var(--accent-cyan)' }} /> {snippet.targetLanguage || "Translation"}
          </h1>
          <div style={{ display: 'flex', gap: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {new Date(snippet.createdAt).toLocaleString()}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserIcon size={16} /> By {snippet.userId?.name || "Anonymous"}
            </span>
            <span style={{ background: 'rgba(157, 80, 187, 0.2)', color: 'var(--accent-purple)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
              {snippet.type?.toUpperCase() || 'TRANSLATION'}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1 }}>
          {/* Source Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Source ({snippet.sourceLanguage || "Original"})</span>
              <button onClick={() => handleCopy(snippet.inputCode || snippet.prompt)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Copy size={16} /></button>
            </div>
            <div style={{ flex: 1, padding: '16px' }}>
              <Editor
                height="500px"
                theme="vs-dark"
                language={snippet.sourceLanguage || "javascript"}
                value={snippet.inputCode || snippet.prompt || ""}
                options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false, padding: { top: 16 } }}
              />
            </div>
          </div>

          {/* Target Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid rgba(0, 210, 255, 0.3)', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>Output ({snippet.targetLanguage || "Result"})</span>
              <button onClick={() => handleCopy(translatedText)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Copy size={16} /></button>
            </div>
            <div style={{ flex: 1, padding: '16px' }}>
              <Editor
                height="500px"
                theme="vs-dark"
                language={snippet.targetLanguage || "python"}
                value={translatedText}
                options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false, padding: { top: 16 } }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetPage;
