import React from "react";
import ReactDOM from "react-dom/client";

// Routing
import { BrowserRouter } from "react-router-dom";

// Google OAuth
import { GoogleOAuthProvider } from "@react-oauth/google";

// Toast notifications
import { Toaster } from "react-hot-toast";

// App
import App from "./App.jsx";

// Auth Context
import { AuthProvider } from "./context/AuthContext.jsx";

// Global styles
import "./index.css";

// Get Google Client ID from .env
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    {/* 🌐 Google OAuth Provider */}
    <GoogleOAuthProvider clientId={googleClientId}>

      {/* 🔀 Routing Provider */}
      <BrowserRouter>

        {/* 🔐 Auth Context (global state) */}
        <AuthProvider>

          {/* Main App */}
          <App />

          {/* 🔔 Toast notifications */}
          <Toaster position="top-right" />

        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>

  </React.StrictMode>
);