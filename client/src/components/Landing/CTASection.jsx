import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="container" style={{ paddingBottom: 'var(--space-96)' }}>
      <div className="cta-container">
        <h2 className="text-h2" style={{ marginBottom: '16px' }}>
          Ready to upgrade your workflow?
        </h2>
        <p className="text-body" style={{ color: 'var(--text-2)' }}>
          Translate, review, search, and run code instantly. Free to start. No card required.
        </p>
        <div className="cta-actions">
          <Link to="/login" className="btn btn-primary btn-lg">
            Start free
          </Link>
          <a href="#how-it-works" className="btn btn-secondary btn-lg">
            Read how it works
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
