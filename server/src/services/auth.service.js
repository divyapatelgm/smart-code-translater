import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { verifyGoogleToken } from "../config/google.config.js";

//  Register Function
export const register = async (name, email, password) => {
  // Check if the email is already registered
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("Email already registered.");
    error.statusCode = 409;
    throw error;
  }

  // Hash the password and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create the user in DB
  const user = await User.create({ name, email, password: hashedPassword });
  // Generate JWT token for the new user
  const token = generateToken(user);

  // Return safe response (NEVER send password)
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
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
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
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
    { googleId: googleUser.googleId },
    {
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      lastLogin: new Date(),
    },
    {
      returnDocument: "after",
      upsert: true,
    },
  );

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

// GET USER PROFILE
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-__v -googleId");  
  //.select('-__v -googleId') excludes internal fields we don't want to expose to the frontend.

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
  };
};