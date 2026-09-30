import mongoose from "mongoose";
import { generateEmbedding } from "../services/gemini.service.js";

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
      enum: ["translate", "ask", "review", "run"],
      required: true,
    },
    title: {
      type: String,
    },
    preview: {
      type: String,
    },
    conversationId: {
      type: String, // Links multiple assistant queries together
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
    isPublic: {
      type: Boolean,
      default: false,
    },
    embedding: {
      type: [Number], // Stores the vector embedding of the input code + output for semantic search
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Optimize retrieval by user and date
historySchema.index({ userId: 1, createdAt: -1 });

// Pre-save hook to automatically generate vector embeddings for semantic search
historySchema.pre("save", async function (next) {
  try {
    // Only generate if we don't have one and this is a new document
    if (this.isNew && (!this.embedding || this.embedding.length === 0)) {
      // Create a rich text representation of the snippet for the embedding model
      const textToEmbed = `
        Task Type: ${this.type}
        Intent: ${this.intent || 'N/A'}
        Languages: ${this.sourceLanguage} to ${this.targetLanguage || 'N/A'}
        Input Code: ${this.inputCode || ''}
        Prompt: ${this.prompt || ''}
        Output: ${JSON.stringify(this.output)}
      `.replace(/\s+/g, " ").trim();
      
      const vector = await generateEmbedding(textToEmbed);
      if (vector && vector.length > 0) {
        this.embedding = vector;
      }
    }
    next();
  } catch (error) {
    console.error("Error generating embedding during save:", error);
    next(); // Don't block the save if embedding fails
  }
});

const History = mongoose.model("History", historySchema);

export default History;
