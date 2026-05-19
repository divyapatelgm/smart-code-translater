import History from "../models/History.model.js";

// 🔹 Create history entry
export const createHistoryEntry = async (data) => {
  const entry = await History.create(data);
  return entry;
};


// 🔹 Get user history (with pagination)
export const getUserHistory = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [entries, totalEntries] = await Promise.all([
    History.find({ userId })
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit),

    History.countDocuments({ userId }),
  ]);

  return {
    entries,
    totalEntries,
    currentPage: page,
    totalPages: Math.ceil(totalEntries / limit),
  };
};


// 🔹 Delete single entry
export const deleteHistoryEntry = async (entryId, userId) => {
  const entry = await History.findOneAndDelete({
    _id: entryId,
    userId,
  });

  if (!entry) {
    throw new Error("History entry not found");
  }

  return entry;
};


// 🔹 Clear all history for user
export const clearUserHistory = async (userId) => {
  await History.deleteMany({ userId });
};

export const getHistoryEntry = async (entryId, userId) => {
  const entry = await History.findOne({
    _id: entryId,
    userId,
  });

  if (!entry) {
    throw new Error("History entry not found");
  }

  return entry;
};