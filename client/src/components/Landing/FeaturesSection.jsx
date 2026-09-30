import React from "react";
import { ArrowRightLeft, MessageSquare, ShieldCheck, Search, Mic, Share2 } from "lucide-react";

const features = [
  {
    title: "Translate",
    description: "Python in, Rust out. Logic intact, idioms native, across 25+ languages.",
    icon: <ArrowRightLeft size={20} />,
    proof: "PY → RS"
  },
  {
    title: "Ask",
    description: "Say what you want. SmartCode picks the mode (explain, debug, generate, translate) and tells you which.",
    icon: <MessageSquare size={20} />,
    proof: "INTENT: DEBUG"
  },
  {
    title: "Review",
    description: "Bugs, security holes and slow paths as color-coded cards, with Big-O worked out for you.",
    icon: <ShieldCheck size={20} />,
    proof: "O(n²) → O(n)"
  },
  {
    title: "Semantic search",
    description: "Find \"the auth logic\" from three weeks ago, even if you never named it that.",
    icon: <Search size={20} />,
    proof: "vector search"
  },
  {
    title: "Voice",
    description: "Hold the mic, describe the function, watch it appear.",
    icon: <Mic size={20} />,
    proof: "live transcription"
  },
  {
    title: "Run & share",
    description: "Run in the browser console, export as .py/.js, share a public link.",
    icon: <Share2 size={20} />,
    proof: ".py .js link"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="landing-section container">
      <div className="section-header">
        <h2 className="text-h2">Powerful Features</h2>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="card feature-card">
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3 className="text-h3" style={{ marginBottom: '8px' }}>{feature.title}</h3>
            <p>{feature.description}</p>
            <div style={{
              display: 'flex',
              borderTop: '1px solid var(--border)',
              paddingTop: '16px',
              marginTop: 'auto'
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                padding: '4px 8px',
                background: 'var(--surface-2)',
                color: 'var(--text-2)',
                borderRadius: '4px',
                border: '1px solid var(--border)'
              }}>
                {feature.proof}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
