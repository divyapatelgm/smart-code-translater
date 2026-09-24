import * as assistantService from "../services/assistant.service.js";
import History from "../models/History.model.js";

export const askAssistant = async (req, res, next) => {
  try {
    const { prompt, currentCode, currentLanguage, conversationId } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const result = await assistantService.processAssistantRequest({
      prompt,
      currentCode,
      currentLanguage,
      conversationContext: [], // TODO: fetch conversation context using conversationId if needed
    });

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
      targetLanguage: result.programmingLanguage
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
