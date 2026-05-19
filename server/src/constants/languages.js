// List of supported programming languages
export const SUPPORTED_LANGUAGES = [
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "csharp", name: "C#", extension: ".cs" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "python", name: "Python", extension: ".py" },
  { id: "javascript", name: "JavaScript", extension: ".js" },
];

// Helper: convert id → readable name
export const getLanguageName = (languageId) => {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === languageId);
  return lang ? lang.name : languageId;
};