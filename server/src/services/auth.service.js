import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { verifyGoogleToken } from "../config/google.config.js";

//  Register Function
export const register = async (name, email, password) => {
  let user = await User.findOne({ email });
  
  if (user) {
    // If user exists and already has a password, they are fully registered
    if (user.password) {
      const error = new Error("Email already registered.");
      error.statusCode = 409;
      throw error;
    } else {
      // User exists from Google OAuth but has no password. Let's link a password!
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      if (name) user.name = name; // Update name if provided
      await user.save();
    }
  } else {
    // Brand new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
  }
  
  // Generate JWT token for the user
  const token = generateToken(user);

  // Return safe response (NEVER send password)
  return {
    token,
    user: await getUserProfile(user._id),
  };
};

// LOGIN FUNCTION
export const emailLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  user.lastLogin = new Date();
  await user.save();
  const token = generateToken(user);

  return {
    token,
    user: await getUserProfile(user._id),
  };
};

// GOOGLE LOGIN FUNCTION
export const googleLogin = async (credential) => {
    //verifyIdToken() asks Google: "Is this token real and was it meant for my app?" 
    // If valid, we get the user's profile info. payload.sub is Google's unique user identifier.
  const googleUser = await verifyGoogleToken(credential);

  /**  findOneAndUpdate with upsert: true is a powerful one-liner: "Find a user with this Google ID. 
  If found, update them. If not found, create them.
  "This handles both new and returning Google users in a single database call. 
  returnDocument: 'after' means "give me back the updated document" (not the old one).*/
  let user = await User.findOneAndUpdate(
    { email: googleUser.email },
    {
      $set: {
        googleId: googleUser.googleId,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        lastLogin: new Date(),
      }
    },
    {
      returnDocument: "after",
      upsert: true,
    },
  );

  const token = generateToken(user);

  return {
    token,
    user: await getUserProfile(user._id),
  };
};

// GET USER PROFILE
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-__v -googleId");  
  //.select('-__v -googleId') excludes internal fields we don't want to expose to the frontend.

  if (!user) {
    throw new Error("User not found");
  }

  const DAILY_LIMIT = 50;
  
  const today = new Date();
  const lastRequestDate = user.lastAiRequestDate ? new Date(user.lastAiRequestDate) : null;
  const isNewDay = !lastRequestDate || 
    lastRequestDate.getDate() !== today.getDate() ||
    lastRequestDate.getMonth() !== today.getMonth() ||
    lastRequestDate.getFullYear() !== today.getFullYear();
    
  const used = isNewDay ? 0 : (user.aiRequestsCount || 0);
  const remaining = Math.max(0, DAILY_LIMIT - used);
  
  const resetsAt = new Date(today);
  resetsAt.setHours(24, 0, 0, 0);

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
    quota: {
      used,
      limit: DAILY_LIMIT,
      remaining,
      resetsAt: resetsAt.toISOString(),
    },
    featureUsage: user.featureUsage ? Object.fromEntries(user.featureUsage) : {},
  };
};