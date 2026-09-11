import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import landing2 from "../../assets/landing2.png";

const WorkspaceSection = () => {
  return (
    <section 
      id="how-it-works" 
      className="workspace-section fade-in"
      style={{ backgroundImage: `url(${landing2})` }}
    >
      <div className="landing-container" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <div className="workspace-content">
          <div className="workspace-badge">More Than Just a Tool</div>
          
          <h2 className="workspace-title">
            A Smarter Way <br />
            <span className="text-gradient">to Code</span>
          </h2>
          
          <p className="workspace-desc">
            Whether you're a student learning to code or a developer building the next big thing, SmartCode is here to support you at every step.
          </p>
          
          <Link to="/login" className="btn-primary" style={{ display: 'inline-flex' }}>
            Start Your Journey <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceSection;
