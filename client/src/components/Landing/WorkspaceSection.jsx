import React from "react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="landing-section container">
      <div className="section-header">
        <h2 className="text-h2">How It Works</h2>
      </div>

      <div className="how-it-works-grid">
        <div className="step-item">
          <div className="step-number">01</div>
          <h3 className="text-h3" style={{ marginBottom: '8px' }}>Paste it or say it.</h3>
          <p className="text-body" style={{ color: 'var(--text-2)' }}>
            Drop in code, type a request, or hold the mic.
          </p>
        </div>

        <div className="step-item">
          <div className="step-number">02</div>
          <h3 className="text-h3" style={{ marginBottom: '8px' }}>Pick a mode.</h3>
          <p className="text-body" style={{ color: 'var(--text-2)' }}>
            Translate, ask, or review. SmartCode shows what it detected before it answers.
          </p>
        </div>

        <div className="step-item">
          <div className="step-number">03</div>
          <h3 className="text-h3" style={{ marginBottom: '8px' }}>Ship it.</h3>
          <p className="text-body" style={{ color: 'var(--text-2)' }}>
            Run it, export it, or share a link.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
