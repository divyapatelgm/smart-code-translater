import React from "react";
import { Atom, Hexagon, Database, Code, Terminal, Server } from "lucide-react";

const TechStrip = () => {
  return (
    <div className="tech-strip fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="landing-container">
        <h5>Trusted by Learners & Developers</h5>
        <div className="tech-icons">
          <div className="tech-item"><Atom color="#61DAFB" /> React</div>
          <div className="tech-item"><Hexagon color="#68A063" /> Node.js</div>
          <div className="tech-item"><Database color="#47A248" /> MongoDB</div>
          <div className="tech-item"><Code color="#F7DF1E" /> JavaScript</div>
          <div className="tech-item"><Terminal color="#3776AB" /> Python</div>
          <div className="tech-item"><Server color="#FFFFFF" /> Express</div>
          <div className="tech-item" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>and more...</div>
        </div>
      </div>
    </div>
  );
};

export default TechStrip;
