import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Play, CheckCircle2, Zap, Users } from "lucide-react";
import landing1 from "../../assets/landing1.png";

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="hero-section fade-in" 
      style={{ animationDelay: "0.1s", backgroundImage: `url(${landing1})` }}
    >
      <div className="landing-container" style={{ width: '100%' }}>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="hero-badge-icon" />
            Your AI-Powered Coding Companion
          </div>
          
          <h1 className="hero-title">
            Code Smarter<br />
            Learn Faster<br />
            <span className="text-gradient">Build Bigger</span>
          </h1>
          
          <p className="hero-subtitle">
            SmartCode helps you write, debug, learn, and improve your code with the power of AI. Designed for students, developers, and problem solvers.
          </p>
          
          <div className="hero-actions">
            <Link to="/login" className="btn-primary">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <Users size={24} className="text-gradient" />
              </div>
              <div className="stat-info">
                <h4>10K+</h4>
                <p>Happy Developers</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Zap size={24} className="text-gradient" />
              </div>
              <div className="stat-info">
                <h4>5x</h4>
                <p>Faster Learning</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <CheckCircle2 size={24} className="text-gradient" />
              </div>
              <div className="stat-info">
                <h4>99%</h4>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
