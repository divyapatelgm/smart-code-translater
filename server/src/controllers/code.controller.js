import * as geminiService from "../services/gemini.service.js";
import * as executionService from "../services/execution.service.js";
import History from "../models/History.model.js";
import Cache from "../models/Cache.model.js";
import { consumeQuota } from "../utils/quota.js";
import crypto from "crypto";

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
    await consumeQuota(req, "translate");

    // Persist to history
    await History.create({
      userId: req.user._id,
      type: "translate",
      sourceLanguage,
      targetLanguage,
      inputCode: code,
      output: result,
      title: `${sourceLanguage || "Unknown"} → ${targetLanguage || "Unknown"}`,
      preview: code
    });

    res.json({ success: true, data: result, quota: req.quota });
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

    const hash = crypto.createHash("sha256").update(JSON.stringify({ mode: "review", language, code })).digest("hex");
    const cached = await Cache.findOne({ hash });
    
    let result;
    if (cached) {
      result = cached.result;
    } else {
      result = await geminiService.reviewCode(code, language);
      await Cache.create({ hash, result });
      await consumeQuota(req, "review");
    }

    await History.create({
      userId: req.user._id,
      type: "review",
      sourceLanguage: language,
      inputCode: code,
      output: result,
      title: `Review · ${language || "Unknown"} · ${result?.complexity?.time || "Unknown"}`,
      preview: code
    });

    res.json({ success: true, data: result, quota: req.quota });
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
    await consumeQuota(req);

    await History.create({
      userId: req.user._id,
      type: "review",
      sourceLanguage: language,
      inputCode: code,
      output: result,
      title: `Review · ${language || "Unknown"} · Unknown`,
      preview: code
    });

    res.json({ success: true, data: result, quota: req.quota });
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
    await consumeQuota(req);

    await History.create({
      userId: req.user._id,
      type: "review",
      sourceLanguage: language,
      inputCode: code,
      output: result,
      title: `Review · ${language || "Unknown"} · Unknown`,
      preview: code
    });

    res.json({ success: true, data: result, quota: req.quota });
  } catch (error) {
    next(error);
  }
};

export const debug = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: "Missing code or language" });
    }

    const result = await geminiService.debugCode(code, language);
    await consumeQuota(req);

    await History.create({
      userId: req.user._id,
      type: "review",
      sourceLanguage: language,
      inputCode: code,
      output: result,
      title: `Review · ${language || "Unknown"} · Unknown`,
      preview: code
    });

    res.json({ success: true, data: result, quota: req.quota });
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

    res.json({ success: true, data: result, quota: req.quota });
  } catch (error) {
    next(error);
  }
};