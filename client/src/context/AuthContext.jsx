import { createContext, useContext, useEffect, useState } from "react";

// Import auth service functions (Step 3)
import { login, register, getMe } from "../services/authService";

// Create context
const AuthContext = createContext();

// 🔹 Custom hook (easy access to context)
export const useAuth = () => useContext(AuthContext);


// 🔹 Auth Provider (wraps entire app)
export const AuthProvider = ({ children }) => {
  // Store logged-in user
  const [user, setUser] = useState(null);

  // Loading state (used while checking auth on app load)
  const [loading, setLoading] = useState(true);


  // 🔄 Runs when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        // If token exists → verify it
        if (token) {
          const userData = await getMe(); // calls backend /auth/me

          // If valid → set user globally
          setUser(userData);
        }
      } catch (error) {
        // Token invalid/expired → remove it
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false); // Done checking
      }
    };

    checkAuth();
  }, []);


  // 🔹 Login Function
  const loginUser = async (email, password) => {
    const data = await login(email, password);

    // Save token in localStorage
    localStorage.setItem("token", data.token);

    // Set user globally
    setUser(data.user);
  };


  // 🔹 Register Function
  const registerUser = async (name, email, password) => {
    const data = await register(name, email, password);

    // Save token
    localStorage.setItem("token", data.token);

    // Set user
    setUser(data.user);
  };


  // 🔹 Logout Function
  const logoutUser = () => {
    // Remove token from browser
    localStorage.removeItem("token");

    // Clear user state
    setUser(null);
  };


  // 🔹 Provide values globally
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};