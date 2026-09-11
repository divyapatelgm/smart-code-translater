import React from "react";
import { Code2, Bug, BookOpen, TrendingUp, GraduationCap, FileCode2 } from "lucide-react";

const features = [
  {
    title: "AI Code Generator",
    description: "Generate clean, efficient code in seconds for any programming language.",
    icon: <Code2 size={24} />,
  },
  {
    title: "AI Debugger",
    description: "Find and fix errors with detailed explanations and suggestions.",
    icon: <Bug size={24} />,
  },
  {
    title: "Code Explanation",
    description: "Understand complex code with simple, easy-to-follow explanations.",
    icon: <BookOpen size={24} />,
  },
  {
    title: "Code Optimization",
    description: "Get suggestions to make your code faster and more efficient.",
    icon: <TrendingUp size={24} />,
  },
  {
    title: "Learn & Practice",
    description: "Explore coding concepts, examples and hands-on practice.",
    icon: <GraduationCap size={24} />,
  },
  {
    title: "Multiple Languages",
    description: "Support for Python, JavaScript, Java, C++, and many more.",
    icon: <FileCode2 size={24} />,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="features-section landing-container">
      <div className="features-header">
        <div className="features-badge">Everything You Need</div>
        <h2 className="features-title">Powerful Features, All in One Place</h2>
        <p className="features-subtitle">
          From generating code to debugging errors, SmartCode makes your development journey smoother and smarter.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card glass-card">
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
