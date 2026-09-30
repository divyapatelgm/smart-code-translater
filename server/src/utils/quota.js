import User from "../models/User.model.js";

export const consumeQuota = async (req, feature = null) => {
  if (!req.user) return;
  const user = await User.findById(req.user._id);
  if (user) {
    user.aiRequestsCount += 1;
    user.lastAiRequestDate = new Date();
    if (feature) {
      if (!user.featureUsage) user.featureUsage = new Map();
      user.featureUsage.set(feature, new Date());
    }
    await user.save();
    
    // Update req.quota so the response gets the decremented remaining
    if (req.quota) {
      req.quota.used = user.aiRequestsCount;
      req.quota.remaining = Math.max(0, req.quota.limit - user.aiRequestsCount);
    }
  }
};
