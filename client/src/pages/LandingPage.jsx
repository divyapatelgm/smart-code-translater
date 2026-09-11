import React, { useEffect } from "react";
import LandingNavbar from "../components/Landing/LandingNavbar";
import HeroSection from "../components/Landing/HeroSection";
import TechStrip from "../components/Landing/TechStrip";
import FeaturesSection from "../components/Landing/FeaturesSection";
import WorkspaceSection from "../components/Landing/WorkspaceSection";
import AboutSection from "../components/Landing/AboutSection";
import CTASection from "../components/Landing/CTASection";
import Footer from "../components/Landing/Footer";

// Styles specific to the landing page
import "../styles/landing.css";

const LandingPage = () => {
  useEffect(() => {
    // Add specific class to body for potential global overrides
    document.body.classList.add('landing-active');
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []);

  return (
    <div className="landing-page">
      <LandingNavbar />
      <main className="landing-content">
        <HeroSection />
        <TechStrip />
        <FeaturesSection />
        <WorkspaceSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
