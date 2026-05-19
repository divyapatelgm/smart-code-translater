import Editor from "@monaco-editor/react";
import { MONACO_LANGUAGE_MAP } from "../constants/languages.js";

function CodeEditor({
  code,
  language,
  onChange,
  readOnly = false,
}) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Editor
        height="100%"
        language={MONACO_LANGUAGE_MAP[language] || "plaintext"}
        value={code}
        onChange={(value) => onChange && onChange(value || "")}
        theme="vs-dark"
        options={{
          readOnly,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          tabSize: 2,
          formatOnType: true,
          formatOnPaste: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;