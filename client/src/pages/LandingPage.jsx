import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LandingNavbar from "../components/Landing/LandingNavbar";
import HeroSection from "../components/Landing/HeroSection";
import TechStrip from "../components/Landing/TechStrip";
import FeaturesSection from "../components/Landing/FeaturesSection";
import HowItWorksSection from "../components/Landing/WorkspaceSection";
import AboutSection from "../components/Landing/AboutSection";
import CTASection from "../components/Landing/CTASection";
import Footer from "../components/Landing/Footer";

// Styles specific to the landing page
import "../styles/landing.css";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [hash]);

  useEffect(() => {
    // Add specific class to body for potential global overrides
    document.body.classList.add('landing-active');
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []);

  if (user) return null; // prevent flash of content

  return (
    <div className="landing-page">
      <LandingNavbar />
      <main className="landing-content">
        <HeroSection />
        <TechStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
