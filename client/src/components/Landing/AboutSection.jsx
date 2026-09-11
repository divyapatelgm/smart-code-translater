import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="landing-container" style={{ padding: '60px 0', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="features-title">About SmartCode</h2>
        <p className="features-subtitle" style={{ marginTop: '20px' }}>
          SmartCode was built with a single vision: to democratize coding by providing AI-powered tools that help learners understand complex concepts and empower developers to build software faster. Whether you're debugging your first script or architecting a large-scale application, SmartCode acts as your intelligent pair-programmer every step of the way.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
