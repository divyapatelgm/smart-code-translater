import History from "../models/History.model.js";
import { generateEmbedding } from "../services/gemini.service.js";

// Utility for Cosine Similarity
const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(vecA.length, vecB.length);
  for (let i = 0; i < len; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

/**
 * Controller for User History Operations
 */

export const getUserHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.q;

    if (searchQuery && searchQuery.trim().length > 0) {
      // Phase 4: Semantic Search (RAG)
      // 1. Generate an embedding for the user's search query
      const queryVector = await generateEmbedding(searchQuery);
      
      // 2. Fetch all user history
      const allHistory = await History.find({ userId: req.user._id }).lean();

      // 3. Calculate Cosine Similarity or Fallback to Text Search for old entries
      const scoredEntries = allHistory.map(entry => {
        let score = 0;
        
        // If it has an embedding, do semantic search
        if (entry.embedding && entry.embedding.length > 0) {
          score = cosineSimilarity(queryVector, entry.embedding);
        } else {
          // If it's an old item without an embedding, do a basic text search fallback
          const textToSearch = `${entry.inputCode || ''} ${entry.prompt || ''} ${entry.sourceLanguage || ''} ${JSON.stringify(entry.output || {})}`.toLowerCase();
          if (textToSearch.includes(searchQuery.toLowerCase())) {
            score = 1.0; // Perfect score if the exact text matches
          }
        }
        
        return { ...entry, similarityScore: score };
      });

      // Filter out entries with 0 score (irrelevant)
      const relevantEntries = scoredEntries.filter(e => e.similarityScore > 0.3 || (e.similarityScore > 0 && !e.embedding));

      // 4. Sort by highest similarity
      relevantEntries.sort((a, b) => b.similarityScore - a.similarityScore);

      // 5. Paginate the sorted results
      const total = relevantEntries.length;
      const paginatedEntries = relevantEntries.slice(skip, skip + limit);

      // Remove the heavy embedding array before sending to frontend
      paginatedEntries.forEach(entry => delete entry.embedding);

      return res.json({
        success: true,
        data: {
          entries: paginatedEntries,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          totalEntries: total,
          isSemanticSearch: true,
        },
      });
    }

    // Default chronological pagination (if no search query)
    const [entries, total] = await Promise.all([
      History.find({ userId: req.user._id }, { embedding: 0 }) // exclude embeddings
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
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

export const shareHistoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const history = await History.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { isPublic: true },
      { new: true }
    );
    if (!history) {
      return res.status(404).json({ success: false, message: "History record not found" });
    }
    res.json({ success: true, message: "Snippet is now public", snippetId: history._id });
  } catch (error) {
    next(error);
  }
};

export const getPublicSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const history = await History.findOne({ _id: id, isPublic: true })
      .populate("userId", "name picture");
    
    if (!history) {
      return res.status(404).json({ success: false, message: "Snippet not found or is private" });
    }
    res.json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};