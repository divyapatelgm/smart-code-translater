import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="landing-section container">
      <div className="about-grid">
        <div className="about-left">
          <h2 className="text-h2">Why we built SmartCode</h2>
          <p className="text-body" style={{ color: 'var(--text-2)' }}>
            Most AI tools treat coding as a simple text generation problem. They autocomplete a few lines, but they don't understand your intent, they don't remember your past decisions, and they definitely don't review for performance and security.
          </p>
          <p className="text-body" style={{ color: 'var(--text-2)' }}>
            We wanted a tool that acts like a senior engineer. One that actually parses your goal, checks your Big-O, and indexes your entire codebase into a vector database so it remembers everything you've ever built.
          </p>
        </div>
        
        <div className="about-right">
          <div className="about-fact">5 build phases</div>
          <div className="about-fact">25+ languages</div>
          <div className="about-fact">Vector search built from scratch</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
