import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Auth & Layout
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <div className="app-shell">
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;