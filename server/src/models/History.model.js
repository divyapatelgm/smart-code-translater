import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["translate", "analyze", "optimize", "explain", "debug", "assistant_ask"],
      required: true,
    },
    sourceLanguage: {
      type: String,
      required: true,
    },
    targetLanguage: {
      type: String, // Optional for non-translation tasks
    },
    inputCode: {
      type: String,
      default: "",
    },
    prompt: {
      type: String,
    },
    intent: {
      type: String,
    },
    naturalLanguage: {
      type: String,
    },
    output: {
      type: Object, // Stores formatted AI response (translatedCode, explanation, etc.)
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optimize retrieval by user and date
historySchema.index({ userId: 1, createdAt: -1 });

const History = mongoose.model("History", historySchema);

export default History;
