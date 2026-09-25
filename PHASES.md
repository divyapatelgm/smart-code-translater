# Smart Code Translator - Project Roadmap

This document tracks the completed features and the upcoming phases for the evolution of the Smart Code Translator into a full-fledged Multilingual AI Coding Assistant.

## ✅ Completed Phases

### 1. The "Ask SmartCode" AI Assistant
- Built the new natural-language AI coding assistant interface (`AskSmartCode.jsx`).
- Created the backend orchestrator (`assistant.service.js`) to intelligently route queries (Translate, Debug, Optimize, Explain).
- Updated the `AIInsightsSidebar` to beautifully render complex markdown and code blocks returned by the AI.

### 2. High-Availability AI & Rate Limiting
- Implemented **Dynamic API Key Cycling (Round-Robin)** in `gemini.service.js`.
- The system now automatically rotates through an array of Gemini API keys when a `429 Too Many Requests` (Rate Limit) error is hit, effectively bypassing free-tier quotas.
- Graceful error handling on the frontend for quota exhaustion.

### 3. Production Deployment & Security
- Completely fixed the Node.js `EADDRINUSE` and IPv6 `ERR_CONNECTION_REFUSED` local binding issues.
- Made `server.js` dynamically bind to `0.0.0.0` *only* when running on Render (`process.env.RENDER`), ensuring zero-config deployments.
- Resolved Google Identity Services (GSI) OAuth 403 errors and origin mismatches.
- Fixed an AuthContext bug where Google logins were silently failing in the background.

---

## 🚀 Upcoming Phases

### Phase 1: Context-Aware Conversation (Memory)
**Status**: ⏳ Pending
**Goal**: Make the AI remember previous messages in the current session.
- Currently, "Ask SmartCode" is single-shot. We need to modify `assistant.controller.js` to fetch recent history from the `History` MongoDB model and append it to the Gemini prompt so users can ask follow-up questions like *"Now optimize the code you just wrote"*.

### Phase 2: Secure Code Execution Sandbox
**Status**: ⏳ Pending
**Goal**: Isolate and secure the code execution environment.
- Review and upgrade the existing `executionService.js`.
- Ensure that when users run Python, JS, or Java code via the AI, it runs in a sandboxed, timeout-restricted environment to prevent infinite loops or malicious server commands.

### Phase 3: User Quotas & Abuse Prevention
**Status**: ⏳ Pending
**Goal**: Protect the pooled API keys from being exhausted by a single user.
- Add a rate-limiter middleware on the `/api/assistant/ask` endpoint.
- Track daily AI requests per `userId` in MongoDB and impose a soft daily limit.

### Phase 4: Shareable Code Snippets
**Status**: ⏳ Pending
**Goal**: Allow users to share their translated/optimized code.
- Add a "Share" button that generates a unique URL (e.g., `/snippet/abc123XYZ`).
- Create a public, read-only view for these snippets.
