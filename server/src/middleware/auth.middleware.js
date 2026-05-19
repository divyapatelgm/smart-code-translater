import { verifyToken } from "../utils/jwt.utils.js";
import User from "../models/User.model.js";

/* authHeader.split(' ')[1] extracts the token from "Bearer eyJhbG..." by splitting on the space. 
After verifying the token using verifyToken from Step 3, we find the user in the database and attach 
them to req.user. Now every route handler downstream can access req.user to know who made the request. 
next() passes control to the next middleware or route handler. */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please log in to access this route.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default authenticate;