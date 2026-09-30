import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../../assets/landing1.png";

const HeroSection = () => {
  const [demoStep, setDemoStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="hero-section container">
        <div className="hero-left">
        <div className="chip" style={{ marginBottom: "24px" }}>
          Gemini-powered · 25+ languages · Voice-ready
        </div>
        
        <h1 className="text-display" style={{ marginBottom: "24px" }}>
          Write it once.<br/>
          <span style={{ color: "var(--accent)" }}>Understand it everywhere.</span>
        </h1>
        
        <p className="text-body-lg hero-subtitle">
          SmartCode works out what you're asking, reviews your code like a senior engineer, remembers every snippet you've written, and translates between 25+ languages — by keyboard or by voice.
        </p>
        
        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary btn-lg">
            Start free
          </Link>
          <a href="#demo" className="btn btn-secondary btn-lg">
            See it in action
          </a>
        </div>
      </div>


      </section>
    </div>
  );
};

export default HeroSection;
