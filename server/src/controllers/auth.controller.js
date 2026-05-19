import * as authService from "../services/auth.service.js";

// Register Controller //
/**The controller first validates the input (are all required fields present?). 
Then it calls the register service function from Step 4 to do the actual work. 
If the service throws an error with a statusCode, we send that specific status. 
Otherwise, next(error) passes it to the global error handler.*/
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const result = await authService.register(name, email, password);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode)
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    next(error);
  }
};

// Login Controller //
/** Same pattern as registerUser — validate input, call the emailLogin service from Step 5, handle errors. */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const result = await authService.emailLogin(email, password);
    return res.json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode)
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    next(error);
  }
};

// Google Auth Controller //
/** Calls the googleLogin service from Step 6 with the credential sent from the frontend. */
export const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res
        .status(400)
        .json({ success: false, message: "Google credential is required." });
    }

    const result = await authService.googleLogin(credential);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// Get Current User Controller //
/** This endpoint is called when the app loads to check if the user is still logged in. 
req.user._id is available because the auth middleware (created in Step 8) has already 
verified the token and attached the user. */
export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user._id);
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Logout Controller //
/** Logout is simple — the real work happens on the frontend (deleting the token from localStorage). 
The backend just confirms the logout. */
export const logout = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      data: { message: "Logged out successfully" },
    });
  } catch (error) {
    next(error);
  }
};