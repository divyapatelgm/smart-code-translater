import History from "../models/History.model.js";

/**
 * Controller for User History Operations
 */

export const getUserHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      History.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      History.countDocuments({ userId: req.user._id }),
    ]);

    res.json({
      success: true,
      data: {
        entries,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalEntries: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHistoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await History.findOneAndDelete({
      _id: id,
      userId: req.user._id, // Ensure user can only delete their own history
    });

    if (!result) {
      return res.status(404).json({ success: false, message: "History record not found" });
    }

    res.json({ success: true, message: "History record deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const clearUserHistory = async (req, res, next) => {
  try {
    await History.deleteMany({ userId: req.user._id });
    res.json({ success: true, message: "All history records cleared" });
  } catch (error) {
    next(error);
  }
};