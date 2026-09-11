import React from "react";
import { Code, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="landing-nav-logo-icon" style={{ width: 28, height: 28 }}>
                <Code size={16} />
              </div>
              SmartCode
            </div>
            <p className="footer-tagline">Code Smarter. Learn Faster. Build Bigger.</p>
          </div>
          
          <div className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <a href="#features" className="footer-link">Features</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
          
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              Git
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              In
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              X
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              YT
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 SmartCode. All rights reserved.</p>
          <div className="footer-made-with">
            Built with <Heart size={14} className="heart-icon" /> for developers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
