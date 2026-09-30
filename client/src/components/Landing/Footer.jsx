import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Github = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const Linkedin = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const Twitter = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Youtube = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="landing-nav-logo" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span>&lt;/&gt;</span> SmartCode
            </Link>
            <p className="text-body" style={{ color: 'var(--text-2)' }}>
              Write it once. Understand it everywhere.
            </p>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Product</h4>
            <div className="footer-links">
              <Link to="/login" className="footer-link">Translate</Link>
              <Link to="/login" className="footer-link">Ask SmartCode</Link>
              <Link to="/login" className="footer-link">Code Review</Link>
              <Link to="/login" className="footer-link">Semantic Search</Link>
              <Link to="/login" className="footer-link">Voice</Link>
              <Link to="/login" className="footer-link">Run & Share</Link>
              <Link to="/login" className="footer-link">History</Link>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Company</h4>
            <div className="footer-links">
              <a href="#about" className="footer-link">About</a>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Legal</h4>
            <div className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; {year} SmartCode. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built with <Heart size={14} style={{ color: 'var(--accent)' }} /> by AI Engineers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
