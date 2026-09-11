import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="cta-section landing-container">
      <div className="cta-container glass-card">
        <h2 className="cta-title">Ready to Code Smarter?</h2>
        <p className="cta-desc">
          Build, debug, learn, and improve with your AI-powered coding companion.
        </p>
        <div className="cta-actions">
          <Link to="/login" className="btn-primary">
            Get Started Free <ArrowRight size={18} />
          </Link>
          <a href="#features" className="btn-outline">
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
