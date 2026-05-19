// Import the pre-configured Axios instance
// This instance already has:
// ✔ base URL (VITE_API_URL)
// ✔ interceptor (auto attaches JWT token)
import API from "./api";


// 🔹 Register User
// Sends name, email, password to backend
// Backend will:
// → hash password
// → create user
// → return token + user
export const register = async (name, email, password) => {
  const response = await API.post("/auth/register", {
    name,
    email,
    password,
  });

  // We return only the useful data (token + user)
  return response.data.data;
};


// 🔹 Email/Password Login
// Sends credentials to backend
// Backend verifies using bcrypt.compare()
// Returns JWT token + user data
export const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data.data;
};


// 🔹 Google Login
// Receives credential (ID token) from Google frontend
// Sends it to backend for verification
// Backend:
// → verifies token with Google
// → creates or updates user
// → returns JWT + user
export const googleLogin = async (credential) => {
  const response = await API.post("/auth/google", {
    credential,
  });

  return response.data.data;
};


// 🔹 Get Current User Profile
// Calls protected route /auth/me
// JWT is automatically attached via Axios interceptor
// Backend uses req.user from middleware
export const getMe = async () => {
  const response = await API.get("/auth/me");

  return response.data.data;
};


// 🔹 Logout
// Calls backend logout route
// Backend just returns success message
// ⚠️ Actual logout = removing token from localStorage (handled in AuthContext)
export const logout = async () => {
  const response = await API.post("/auth/logout");

  return response.data;
};