import CodeEditor from "./CodeEditor.jsx";
import "../styles/components.css";

// 🔹 Small reusable card
function InfoCard({ title, value }) {
  return (
    <div className="info-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

function OutputPanel({ result, action, targetLanguage }) {
  // 🔹 Empty state
  if (!result) {
    return (
      <div className="empty-state">
        <p>
          Write code, pick an action, and hit <span>Run</span>
        </p>
      </div>
    );
  }

  // 🔹 TRANSLATE
  if (action === "translate") {
    return (
      <CodeEditor
        code={result.translatedCode}
        language={targetLanguage}
        readOnly
      />
    );
  }

  // 🔹 ANALYZE
  if (action === "analyze") {
    return (
      <div className="analysis-container">
        <InfoCard
          title="Time Complexity"
          value={result.timeComplexity}
        />
        <InfoCard
          title="Space Complexity"
          value={result.spaceComplexity}
        />

        <div className="explanation-box">
          <h4>Explanation</h4>
          <p>{result.explanation}</p>
        </div>
      </div>
    );
  }

  // 🔹 OPTIMIZE
  if (action === "optimize") {
    return (
      <div className="optimize-container">
        <CodeEditor
          code={result.optimizedCode}
          language={targetLanguage}
          readOnly
        />

        <div className="suggestions-box">
          <h4>Suggestions</h4>
          <p>{result.suggestions}</p>
        </div>
      </div>
    );
  }

  // 🔹 EXPLAIN
  if (action === "explain") {
    return (
      <div className="explanation-container">
        <h4>Explanation</h4>
        <p>{result.explanation}</p>
      </div>
    );
  }

  return null;
}

export default OutputPanel;