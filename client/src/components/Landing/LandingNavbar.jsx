import React from "react";
import { Link } from "react-router-dom";
import { Code2, Moon, Menu } from "lucide-react";

const LandingNavbar = () => {
  return (
    <nav className="landing-nav landing-container fade-in">
      <Link to="/" className="landing-nav-logo">
        <div className="landing-nav-logo-icon">
          <Code2 size={20} />
        </div>
        SmartCode
      </Link>

      <div className="landing-nav-links">
        <a href="#home" className="landing-nav-link">Home</a>
        <a href="#features" className="landing-nav-link">Features</a>
        <a href="#how-it-works" className="landing-nav-link">How It Works</a>
        <a href="#about" className="landing-nav-link">About</a>
      </div>

      <div className="landing-nav-actions">
        <Link to="/login" className="btn-outline">
          Login
        </Link>
        <Link to="/login" className="btn-primary">
          Get Started
        </Link>
        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
