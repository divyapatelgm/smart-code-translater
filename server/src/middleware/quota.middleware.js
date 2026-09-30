import User from "../models/User.model.js";

const DAILY_LIMIT = 50; // Max AI requests per day per user

const checkQuota = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const today = new Date();
    const lastRequestDate = user.lastAiRequestDate ? new Date(user.lastAiRequestDate) : null;

    // Check if the last request was on a different calendar day
    const isNewDay = !lastRequestDate || 
      lastRequestDate.getDate() !== today.getDate() ||
      lastRequestDate.getMonth() !== today.getMonth() ||
      lastRequestDate.getFullYear() !== today.getFullYear();

    if (isNewDay) {
      // Reset counter for the new day but don't save yet, let the controller save if it consumes quota.
      // Wait, we need to save the reset so the frontend gets the right 'used' value even if no quota is consumed.
      user.aiRequestsCount = 0;
      user.lastAiRequestDate = today;
      await user.save();
    } else {
      if (user.aiRequestsCount >= DAILY_LIMIT) {
        return res.status(429).json({ 
          success: false, 
          message: `Daily AI limit reached (${DAILY_LIMIT}/${DAILY_LIMIT}). Please try again tomorrow.` 
        });
      }
    }
    
    // Calculate resetsAt (midnight of the next day in user's or server's timezone)
    const resetsAt = new Date(today);
    resetsAt.setHours(24, 0, 0, 0);

    // Attach quota info to request so controllers or response can use it if needed
    req.quota = {
      used: user.aiRequestsCount,
      limit: DAILY_LIMIT,
      remaining: Math.max(0, DAILY_LIMIT - user.aiRequestsCount),
      resetsAt: resetsAt.toISOString()
    };

    next();
  } catch (error) {
    console.error("Quota check error:", error);
    next(error);
  }
};

export default checkQuota;
