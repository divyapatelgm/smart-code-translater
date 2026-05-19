import * as geminiService from "../services/gemini.service.js";
import * as executionService from "../services/execution.service.js";
import History from "../models/History.model.js";

/**
 * Controller for AI Operations (Translate, Analyze, etc.)
 */

export const translate = async (req, res, next) => {
  try {
    const { code, sourceLanguage, targetLanguage } = req.body;

    if (!code || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const result = await geminiService.translateCode(code, sourceLanguage, targetLanguage);

    // Persist to history
    await History.create({
      userId: req.user._id,
      type: "translate",
      sourceLanguage,
      targetLanguage,
      inputCode: code,
      output: result,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const analyze = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: "Missing code or language" });
    }

    const result = await geminiService.analyzeComplexity(code, language);

    await History.create({
      userId: req.user._id,
      type: "analyze",
      sourceLanguage: language,
      inputCode: code,
      output: result,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const optimize = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: "Missing code or language" });
    }

    const result = await geminiService.optimizeCode(code, language);

    await History.create({
      userId: req.user._id,
      type: "optimize",
      sourceLanguage: language,
      inputCode: code,
      output: result,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const explain = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: "Missing code or language" });
    }

    const result = await geminiService.explainCode(code, language);

    await History.create({
      userId: req.user._id,
      type: "explain",
      sourceLanguage: language,
      inputCode: code,
      output: result,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const execute = async (req, res, next) => {
  try {
    const { code, language, stdin } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: "Missing code or language" });
    }

    const result = await executionService.executeCode(code, language, stdin);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};