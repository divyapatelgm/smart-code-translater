import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const LandingNavbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "how-it-works", "about"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        // Header is 72px, adding a small buffer for precision
        if (el && window.scrollY >= (el.offsetTop - 75)) {
          current = section;
        }
      }
      setActiveSection(current);

      if (current && window.location.hash !== `#${current}`) {
        window.history.replaceState(null, "", `#${current}`);
      } else if (!current && window.scrollY < 100 && window.location.hash) {
        window.history.replaceState(null, "", " ");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="landing-nav">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
      <Link to="/" className="landing-nav-logo" onClick={() => { window.scrollTo(0, 0); window.history.pushState(null, "", " "); }}>
        <span>&lt;/&gt;</span> SmartCode
      </Link>

      <div className="landing-nav-links">
        <a 
          href="#features" 
          className={`landing-nav-link ${activeSection === "features" ? "active" : ""}`}
        >
          Features
        </a>
        <a 
          href="#how-it-works" 
          className={`landing-nav-link ${activeSection === "how-it-works" ? "active" : ""}`}
        >
          How It Works
        </a>
        <a 
          href="#about" 
          className={`landing-nav-link ${activeSection === "about" ? "active" : ""}`}
        >
          About
        </a>
      </div>

      <div className="landing-nav-actions">
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
        <Link to="/login" className="btn btn-primary">
          Get Started
        </Link>
        <button className="mobile-menu-btn" aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
