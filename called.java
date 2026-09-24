You are working on my existing project **Smart Code Translator**, an AI-powered full-stack coding application.

Repository/project already contains a working application. **Do not rebuild the project from scratch.** First inspect the complete existing codebase, understand the current architecture, identify reusable components/services/routes, and then extend the application.

The goal is to evolve Smart Code Translator from a code translation/analysis tool into a **multilingual AI coding assistant** while preserving all existing functionality.

---

# 1. EXISTING PROJECT

Current stack:

### Frontend

* React
* Vite
* React Router
* Monaco Editor
* Framer Motion
* Axios
* Lucide React

### Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* Google Gemini API
* JWT authentication
* bcryptjs
* Google OAuth

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

Existing capabilities include:

* Code translation
* Code analysis
* Code optimization
* Code explanation
* AI debugging
* Code execution
* Monaco Editor
* Operation history
* JWT authentication
* Google OAuth
* Responsive UI

Do not break these existing capabilities.

---

# 2. NEW PRODUCT DIRECTION

Transform SmartCode into:

**"A multilingual AI-powered coding assistant that understands natural-language programming requests, generates code, modifies existing code, translates code, explains code, debugs code, optimizes code, analyzes code, and executes code."**

The existing code translation functionality should remain an important feature, but the application should now support a much more natural workflow:

User writes:

> Write a Python program to find the sum of two numbers.

SmartCode should automatically understand:

```text
Intent: Code Generation
Natural Language: English
Programming Language: Python
Task: Sum of two numbers
```

Then generate the code and place it directly into Monaco Editor.

The user should not have to manually configure multiple settings for common requests.

---

# 3. FIRST STEP — INSPECT BEFORE MODIFYING

Before writing code:

1. Inspect the complete frontend structure.
2. Inspect the complete backend structure.
3. Inspect existing routes.
4. Inspect controllers.
5. Inspect Gemini integration.
6. Inspect authentication middleware.
7. Inspect MongoDB/Mongoose models.
8. Inspect Monaco Editor implementation.
9. Inspect history functionality.
10. Inspect current deployment/environment configuration.
11. Identify existing reusable components.
12. Identify possible conflicts or duplicated functionality.

Do not make assumptions about the current implementation.

Create a short internal architecture understanding before modifying anything.

Prefer extending existing services/components instead of creating unnecessary duplicates.

---

# 4. CORE NEW FEATURE — "ASK SMARTCODE"

Add a prominent AI input interface called:

**Ask SmartCode**

Example UI:

```text
┌───────────────────────────────────────────────────────┐
│ ✨ Ask SmartCode                                      │
│                                                       │
│ Write a Python program to calculate factorial         │
│ using recursion.                                      │
│                                                       │
│                              [ Generate → ]           │
└───────────────────────────────────────────────────────┘
```

The user should be able to describe their programming requirement in normal language.

Examples:

* Write a Python program to add two numbers.
* Create a Java program to check whether a number is prime.
* Make a React component for a login form.
* Convert this Python code into C++.
* Why am I getting an IndexError?
* Explain this code line by line.
* Make this code faster.
* Find bugs in this program.
* Write a function to reverse a linked list.
* Create a REST API for user registration.

The system should automatically determine what the user wants.

---

# 5. INTENT DETECTION

Introduce an AI request-classification layer.

Supported intents should include at minimum:

```text
generate
translate
explain
debug
optimize
analyze
modify
execute
```

Examples:

User:

"Write Python code to calculate factorial."

→ generate

User:

"Convert this Python code to Java."

→ translate

User:

"Why does this code throw IndexError?"

→ debug

User:

"Explain this program."

→ explain

User:

"Make this algorithm more efficient."

→ optimize

User:

"What is the time complexity?"

→ analyze

User:

"Turn this into a function."

→ modify

Do not require the user to explicitly select an operation.

If the system is uncertain, handle the ambiguity gracefully rather than blindly generating code.

---

# 6. PROGRAMMING LANGUAGE DETECTION

Implement automatic programming-language identification.

The system should distinguish:

### Natural language

from:

### Programming language

Example:

> "Write Java code to reverse a string."

Result:

```json
{
  "naturalLanguage": "English",
  "programmingLanguage": "Java",
  "intent": "generate"
}
```

If the programming language is explicitly mentioned, use it.

If the user asks for code without specifying a programming language, use the currently selected language if available.

If no language is selected, either:

1. use a sensible configured default, or
2. ask the user which programming language they want.

Do not randomly select a language.

Support the languages already supported by the current application.

---

# 7. MULTILINGUAL NATURAL-LANGUAGE INPUT

SmartCode must support users asking programming questions in different human languages.

At minimum design the architecture so that prompts can work with:

* English
* Kannada
* Hindi

and other languages supported reliably by the Gemini model.

Examples:

Kannada:

"ಎರಡು ಸಂಖ್ಯೆಗಳ ಮೊತ್ತವನ್ನು ಕಂಡುಹಿಡಿಯಲು Python code ಬರೆಯಿರಿ."

Hindi:

"दो संख्याओं का योग निकालने के लिए Python प्रोग्राम लिखो।"

English:

"Write Python code to add two numbers."

The system should detect the natural language separately from the programming language.

Example:

```json
{
  "naturalLanguage": "Kannada",
  "programmingLanguage": "Python",
  "intent": "generate"
}
```

The generated code must remain valid Python.

For explanations, debugging responses, and natural-language responses, preferably respond in the user's detected language when practical.

Do not translate programming syntax.

---

# 8. STRUCTURED GEMINI RESPONSES

Do not depend on uncontrolled plain-text Gemini responses.

Create a structured response format.

For example:

```json
{
  "intent": "generate",
  "naturalLanguage": "English",
  "programmingLanguage": "Python",
  "title": "Sum of Two Numbers",
  "code": "a = int(input())...",
  "explanation": "This program reads two numbers and calculates their sum.",
  "warnings": [],
  "suggestions": []
}
```

For different intents, return the relevant fields.

The backend should validate the Gemini response before sending it to the frontend.

Handle malformed AI responses gracefully.

Never crash the server because Gemini returned unexpected output.

---

# 9. MONACO EDITOR INTEGRATION

This is one of the most important requirements.

When code generation succeeds:

**Automatically put the generated code into Monaco Editor.**

Do not merely display the code as an AI response.

Example workflow:

```text
User request
     ↓
Gemini
     ↓
Generated code
     ↓
Monaco Editor
     ↓
User can edit it
```

After generation, automatically update the editor language when the programming language is confidently identified.

Do not overwrite existing user code without protection.

If the editor already contains meaningful code, provide a safe UX such as:

* Replace
* Insert
* Open in new result
* Cancel

Do not silently destroy user work.

---

# 10. CONTEXT-AWARE FOLLOW-UP CONVERSATION

Add contextual interaction.

Example:

User:

> Write Python code to check whether a number is prime.

SmartCode generates code.

User:

> Make it a function.

SmartCode should understand that "it" refers to the previously generated code.

Then:

> Optimize it.

Then:

> Convert it to C++.

Then:

> Explain the C++ version.

The system should maintain enough recent context to understand these follow-up instructions.

Context should include, when available:

* previous user request
* previous AI response
* current code
* current programming language
* previous intent

Avoid sending an unnecessarily huge conversation history to Gemini.

Use a reasonable context window and summarize older context when necessary.

---

# 11. CURRENT CODE AWARENESS

The AI assistant must understand the code currently present in Monaco Editor.

For example:

User has Python code in the editor.

User asks:

> Explain this.

The backend should receive the current code.

Similarly:

> Convert this to Java.

should use the current editor code if no separate code is supplied.

Define clear precedence:

1. Explicit code in the user request
2. Current Monaco Editor code
3. Conversation context

---

# 12. UNIFIED AI ACTIONS

Keep the existing individual operations:

* Translate
* Analyze
* Optimize
* Explain
* Debug
* Execute

But make them work together with Ask SmartCode.

Example:

Generated code appears in Monaco.

Below/around the editor provide contextual actions:

```text
▶ Run
🐞 Debug
💡 Explain
⚡ Optimize
🔄 Translate
🔍 Analyze
```

These actions should operate on the current editor code.

---

# 13. SMART RESPONSE PANEL

Create a clean result area that can display:

### Generated Code

### Explanation

### Detected Language

### Programming Language

### Intent

### Warnings

### Suggestions

### Errors

Do not overload the interface.

Use expandable/collapsible sections where appropriate.

Maintain the existing SmartCode visual language and design system.

Do not introduce excessive gradients or unrelated visual styles.

Keep the interface professional and developer-oriented.

The visual quality should feel inspired by modern developer tools such as VS Code, Linear, GitHub, and modern AI coding assistants, but do not copy any proprietary interface.

---

# 14. EXECUTION WORKFLOW

When generated code is inserted into Monaco:

The existing Execute feature should remain available.

However, treat code execution as a separate security-sensitive subsystem.

Do not execute arbitrary code directly inside the Node.js backend process.

If the current execution implementation is unsafe, identify it and improve it or clearly isolate it.

Use appropriate sandboxing/isolation where technically feasible.

Never allow generated/user code to compromise:

* server filesystem
* environment variables
* database
* host process
* application secrets
* network infrastructure

Do not expose API keys or secrets to the frontend.

---

# 15. HISTORY IMPROVEMENT

Extend operation history to support AI assistant interactions.

Store useful metadata such as:

```text
user
prompt
intent
naturalLanguage
programmingLanguage
inputCode
generatedCode
operation
createdAt
```

Do not unnecessarily duplicate huge conversation histories.

Users should be able to reopen a previous generated result.

Existing history functionality must continue working.

---

# 16. ERROR HANDLING

Handle:

* Gemini API failures
* timeout
* rate limits
* malformed Gemini responses
* unsupported programming languages
* ambiguous requests
* empty prompts
* empty editor
* invalid code
* execution errors
* authentication failures
* database failures

Show user-friendly messages.

Never expose:

* API keys
* JWT secrets
* database connection strings
* internal stack traces
* sensitive server information

---

# 17. LOADING EXPERIENCE

AI requests can take time.

Implement polished states:

```text
Thinking...
Understanding request...
Generating code...
Updating editor...
```

Use appropriate loading indicators.

Prevent duplicate requests while a request is already running.

Allow cancellation if the current architecture supports it.

---

# 18. STREAMING — OPTIONAL PHASE

Do not make streaming a prerequisite for the first implementation.

First make the structured request/response workflow reliable.

After the core implementation works, consider streaming Gemini responses if it provides a meaningful UX improvement.

Do not introduce unnecessary complexity before the basic architecture is stable.

---

# 19. API DESIGN

Add a clean backend endpoint, for example:

```http
POST /api/assistant/ask
```

Request:

```json
{
  "prompt": "Write a Python program to add two numbers",
  "currentCode": "",
  "currentLanguage": "auto",
  "conversationId": null
}
```

Response:

```json
{
  "success": true,
  "data": {
    "intent": "generate",
    "naturalLanguage": "English",
    "programmingLanguage": "Python",
    "title": "Sum of Two Numbers",
    "code": "...",
    "explanation": "...",
    "warnings": [],
    "suggestions": []
  }
}
```

Follow the project's existing API conventions if they differ.

Do not create duplicate route/controller patterns unnecessarily.

---

# 20. AUTHENTICATION

The new assistant endpoint must respect the existing authentication system.

Only authenticated users should access user-specific AI history.

Reuse existing JWT middleware.

Do not implement a second authentication mechanism.

---

# 21. COST AND TOKEN CONTROL

Gemini calls should be designed efficiently.

Do not send:

* unnecessary conversation history
* duplicated code
* irrelevant UI information
* unnecessary metadata

Limit prompt size.

Use concise structured system instructions.

Consider configurable limits for:

* maximum prompt length
* maximum code length
* conversation context
* output size

---

# 22. FRONTEND ARCHITECTURE

Avoid putting all assistant logic inside one React component.

Create reusable components/hooks/services where appropriate.

Possible structure:

```text
components/
  AskSmartCode/
  AIResponsePanel/
  Editor/
  EditorActions/
  LanguageSelector/
  ConversationPanel/

hooks/
  useAssistant.js

services/
  assistantApi.js
```

Adapt this to the existing project's actual structure rather than blindly creating these exact folders.

---

# 23. BACKEND ARCHITECTURE

Prefer separation of concerns.

Possible architecture:

```text
routes/
  assistantRoutes.js

controllers/
  assistantController.js

services/
  assistantService.js
  geminiService.js
  intentService.js

utils/
  responseParser.js
  promptBuilder.js
```

Again, adapt this to the existing architecture.

Do not create unnecessary abstractions.

---

# 24. PROMPT ENGINEERING

Create a centralized prompt-building system.

The AI should be instructed to:

1. Understand the user's request.
2. Identify intent.
3. Identify natural language.
4. Identify programming language.
5. Consider current code.
6. Consider conversation context.
7. Generate or modify code when requested.
8. Preserve correct syntax.
9. Return structured output.
10. Never include markdown fences inside the `code` field.
11. Clearly distinguish code from explanation.
12. Avoid inventing unsupported capabilities.

The prompt should prioritize correctness over unnecessary verbosity.

---

# 25. AMBIGUOUS REQUESTS

Handle ambiguous requests intelligently.

Example:

> "Write code to sort numbers."

If no language is known:

Ask:

> "Which programming language would you like?"

Example:

> "Make this better."

If current code exists, ask what kind of improvement is intended, unless the context makes the intent obvious.

Do not blindly guess when the ambiguity could produce a materially different result.

---

# 26. UI/UX REQUIREMENTS

The application should feel like a polished AI developer tool.

Important principles:

* clean layout
* strong visual hierarchy
* responsive
* keyboard friendly
* accessible controls
* meaningful loading states
* clear errors
* minimal unnecessary animations
* no excessive gradients
* avoid clutter
* preserve Monaco's professional editing experience

The Ask SmartCode interface should be visually prominent but should not consume excessive editor space.

---

# 27. KEYBOARD SHORTCUT

Consider adding:

```text
Ctrl/Cmd + Enter
```

to submit the Ask SmartCode request.

Do not interfere with existing Monaco shortcuts.

---

# 28. EXAMPLE USER JOURNEYS TO SUPPORT

Test these scenarios.

### Scenario 1 — Basic generation

Input:

> Write a Python program to find the sum of two numbers.

Expected:

```text
Intent: generate
Language: Python
```

Generated code appears in Monaco.

---

### Scenario 2 — Java generation

Input:

> Create a Java program to check whether a number is prime.

Expected Java code.

---

### Scenario 3 — Translation

Current editor contains Python.

User:

> Convert this to C++.

Expected:

```text
Intent: translate
Target: C++
```

Editor updates with C++.

---

### Scenario 4 — Explanation

Current editor contains code.

User:

> Explain this line by line.

Expected explanation.

---

### Scenario 5 — Debugging

Current editor contains broken code.

User:

> Find the bug and fix it.

Expected:

* bug explanation
* corrected code
* editor update

---

### Scenario 6 — Optimization

User:

> Make this code more efficient.

Expected:

* optimized code
* explanation of improvements

---

### Scenario 7 — Kannada

Input:

> ಎರಡು ಸಂಖ್ಯೆಗಳ ಮೊತ್ತವನ್ನು ಕಂಡುಹಿಡಿಯಲು Python code ಬರೆಯಿರಿ.

Expected:

```text
Natural Language: Kannada
Programming Language: Python
Intent: generate
```

---

### Scenario 8 — Hindi

Input:

> इस Python code को Java में बदलो।

Expected translation to Java.

---

### Scenario 9 — Follow-up

User:

> Write Python code to calculate factorial.

Then:

> Make it recursive.

Then:

> Explain it.

The assistant must preserve context.

---

### Scenario 10 — Current editor context

Editor contains code.

User:

> Convert this to JavaScript.

The assistant must use the editor content.

---

# 29. TESTING

Before considering the feature complete:

### Backend tests

Test:

* valid generation
* translation
* debugging
* explanation
* optimization
* malformed Gemini response
* empty request
* unauthorized request
* unsupported language
* Gemini failure
* database failure

### Frontend tests

Test:

* Ask SmartCode submission
* loading state
* editor update
* language update
* AI response rendering
* errors
* existing operations
* mobile/responsive layout

### Regression testing

Make sure existing:

* login
* registration
* Google authentication
* dashboard
* history
* translation
* analysis
* optimization
* explanation
* debugging
* execution

still work.

---

# 30. ENVIRONMENT VARIABLES

Do not hardcode secrets.

Review current environment variables and preserve the existing naming convention.

Backend secrets must remain server-side.

Frontend should only contain variables that are safe to expose publicly.

Do not commit `.env` files.

---

# 31. DEPLOYMENT COMPATIBILITY

The application is deployed using:

Frontend:
Vercel

Backend:
Render

Database:
MongoDB Atlas

Ensure the implementation works in production.

Pay particular attention to:

* CORS
* environment variables
* API URL
* Google OAuth authorized origins
* HTTPS
* MongoDB connection
* Vercel production/preview environments
* Render environment variables

Do not assume localhost URLs in production.

---

# 32. DOCUMENTATION

Update the README after implementation.

Document:

* new AI assistant capability
* architecture
* Ask SmartCode workflow
* intent detection
* language detection
* multilingual support
* API endpoint
* environment variables
* examples
* updated architecture diagram

Update `DETAILED_README.md` if appropriate.

---

# 33. IMPLEMENTATION RULES

IMPORTANT:

### Do NOT:

* rebuild the project
* remove working features
* replace the existing stack unnecessarily
* introduce unnecessary libraries
* hardcode API keys
* expose secrets
* silently overwrite user code
* duplicate existing services
* create unnecessary abstractions
* break existing routes
* change database structure without considering existing data
* change the UI completely without reason

### DO:

* inspect first
* reuse existing code
* make incremental changes
* keep backward compatibility
* maintain clean architecture
* validate AI output
* handle errors
* test every major change
* keep the UI consistent
* document important architectural decisions

---

# 34. IMPLEMENTATION ORDER

Implement in this order:

### Phase 1

Inspect and understand existing application.

### Phase 2

Create the backend `/api/assistant/ask` flow.

### Phase 3

Implement structured Gemini response.

### Phase 4

Implement intent detection.

### Phase 5

Implement programming-language detection.

### Phase 6

Implement natural-language detection.

### Phase 7

Implement Monaco integration.

### Phase 8

Implement current-code awareness.

### Phase 9

Implement contextual follow-up requests.

### Phase 10

Implement multilingual responses.

### Phase 11

Improve history.

### Phase 12

Improve UI/UX.

### Phase 13

Testing and regression testing.

### Phase 14

Update documentation.

### Phase 15

Production/deployment verification.

Do not try to implement everything in one uncontrolled modification.

After each major phase, verify that the application still builds and existing functionality remains intact.

---

# 35. SUCCESS CRITERIA

The implementation should satisfy this core experience:

A user opens SmartCode and can simply type:

> "Write a Python program to check whether a number is prime."

SmartCode understands the request.

It identifies:

```text
Intent → Generate
Human Language → English
Programming Language → Python
```

Gemini generates structured output.

The generated Python code appears automatically in Monaco.

The user can then:

```text
Run
Debug
Explain
Optimize
Analyze
Translate
```

without manually copying code between features.

The user can also communicate in Kannada/Hindi/English and continue the conversation with follow-up requests such as:

> "Make it recursive."

> "Now optimize it."

> "Convert it to C++."

> "Explain this version."

The final product should feel like a coherent **AI coding assistant**, not a collection of unrelated AI buttons.

---

# 36. IMPORTANT FINAL INSTRUCTION

Before changing anything, inspect the existing repository carefully.

After implementation:

1. Run the frontend build.
2. Run the backend.
3. Check for lint/runtime errors.
4. Test the new assistant flow.
5. Test existing features.
6. Fix regressions.
7. Review security.
8. Review production environment configuration.
9. Update documentation.

At the end, provide a concise implementation report containing:

* files changed
* features added
* APIs added/modified
* database changes
* environment variable changes
* tests performed
* known limitations
* recommended next steps

Do not claim a feature works unless you actually verified it.

Start by inspecting the existing project. Do not modify code until you understand the current architecture.
