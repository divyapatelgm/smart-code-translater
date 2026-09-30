import * as assistantService from "../services/assistant.service.js";
import History from "../models/History.model.js";
import { consumeQuota } from "../utils/quota.js";

export const askAssistant = async (req, res, next) => {
  try {
    const { prompt, currentCode, currentLanguage, conversationId } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    let conversationContext = [];
    if (conversationId) {
      // Fetch the last 5 messages in this conversation
      const recentHistory = await History.find({ 
        userId: req.user._id, 
        conversationId 
      })
      .sort({ createdAt: -1 })
      .limit(5);

      // Reverse so they are in chronological order
      conversationContext = recentHistory.reverse().map(h => ({
        role: "user",
        prompt: h.prompt,
        response: h.output,
        timestamp: h.createdAt
      }));
    }

    const result = await assistantService.processAssistantRequest({
      prompt,
      currentCode,
      currentLanguage,
      conversationContext,
    });
    
    await consumeQuota(req, "ask");

    // Save history
    await History.create({
      userId: req.user._id,
      type: "assistant_ask",
      inputCode: currentCode || "",
      sourceLanguage: currentLanguage || "auto",
      output: result,
      prompt: prompt,
      intent: result.intent,
      naturalLanguage: result.naturalLanguage,
      targetLanguage: result.programmingLanguage,
      conversationId: conversationId || null
    });

    res.json({ success: true, data: result, quota: req.quota });
  } catch (error) {
    next(error);
  }
};
