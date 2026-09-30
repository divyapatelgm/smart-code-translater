import React from "react";
import { Atom, Hexagon, Database, Code, Terminal, Server } from "lucide-react";

const TechStrip = () => {
  return (
    <div className="tech-strip">
      <div className="container">
        <h5 className="tech-strip-label">Built with</h5>
        <div className="tech-icons">
          <div className="tech-item"><Atom size={24} /> <span>React</span></div>
          <div className="tech-item"><Hexagon size={24} /> <span>Node.js</span></div>
          <div className="tech-item"><Database size={24} /> <span>MongoDB</span></div>
          <div className="tech-item"><Code size={24} /> <span>JavaScript</span></div>
          <div className="tech-item"><Terminal size={24} /> <span>Python</span></div>
          <div className="tech-item"><Server size={24} /> <span>Express</span></div>
        </div>
      </div>
    </div>
  );
};

export default TechStrip;
