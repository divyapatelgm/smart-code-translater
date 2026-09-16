# 🚀 Smart Code Translator

Smart Code Translator is an AI-powered full-stack web application that helps developers translate, analyze, optimize, explain, debug, and execute code across programming languages using Google Gemini AI.

[🌐 Live Demo](https://smart-code-translater-nine.vercel.app/) | [📦 Source Code](https://github.com/divyapatelgm/smart-code-translater)

--------------------------------------------------

## ✨ Features

- **AI Code Translation:** Instantly translate code between various programming languages.
- **Code Analysis:** Analyze code for complexity, performance bottlenecks, and best practices.
- **Code Optimization:** Automatically refactor and optimize code for efficiency.
- **Code Explanation:** Get detailed, line-by-line explanations of complex code snippets.
- **AI Debugging:** Identify syntax and logical errors and get AI-suggested fixes.
- **Code Execution:** Safely execute code snippets directly in the browser.
- **Monaco Code Editor:** Professional, VS Code-like editing experience built-in.
- **Operation History:** Keep track of your previous code translations and reusable snippets.
- **Authentication:** JWT-based secure user authentication and Google OAuth.
- **Responsive UI:** Modern, dynamic, and fully responsive user interface built with Framer Motion.

--------------------------------------------------

## 📸 Screenshots

> **Note:** Screenshots should be added here. (Add files to `client/public/screenshots/`)

1. **Login & Register:** Secure authentication flow.
2. **Main Editor:** Monaco Editor interface for writing code.
3. **Translation Results:** Side-by-side code translation.
4. **Code Insights:** Analysis and AI-powered fixes.
5. **Dashboard:** Overview of past operations history.

--------------------------------------------------

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- React Router v7
- Monaco Editor (`@monaco-editor/react`)
- Framer Motion
- Axios
- Lucide React

**Backend:**
- Node.js + Express
- MongoDB Atlas & Mongoose
- Google Gemini API (`@google/generative-ai`)
- JSON Web Tokens (JWT) & bcryptjs
- Google Auth Library

--------------------------------------------------

## 🧠 How It Works

1. **User Input:** The user logs in and inputs code into the Monaco Editor on the React frontend.
2. **API Request:** The client sends a securely authenticated request (via Axios) to the Express REST API.
3. **Processing:** The Node.js backend verifies the JWT and constructs a context-aware prompt.
4. **AI Generation:** The backend queries the Google Gemini API to process the code.
5. **Storage:** The result is saved to MongoDB Atlas to maintain the user's operation history.
6. **Result Display:** The processed code, analysis, or explanation is returned and rendered dynamically in the frontend.

--------------------------------------------------

## 🏗️ System Architecture

```text
                    ┌────────────────────────────┐
                    │        React + Vite        │
                    │      Frontend Client       │
                    │   (Monaco Editor, Axios)   │
                    └────────────┬───────────────┘
                                 │ HTTPS (JSON)
                                 ▼
                    ┌────────────────────────────┐
                    │      Node.js + Express     │
                    │          REST API          │
                    │     (JWT, Google Auth)     │
                    └──────┬──────────────────┬──┘
                           │                  │
               Mongoose    │                  │ @google/genai
               (MongoDB)   ▼                  ▼
             ┌─────────────────┐       ┌─────────────────┐
             │  MongoDB Atlas  │       │  Google Gemini  │
             │   (Database)    │       │   (AI Engine)   │
             └─────────────────┘       └─────────────────┘
```

--------------------------------------------------

## 🔐 Security

- **JSON Web Tokens (JWT):** All API operations (except login/register) are protected by a JWT middleware.
- **Password Hashing:** Passwords are encrypted using `bcryptjs` before storage in the database.
- **CORS:** Cross-Origin Resource Sharing is configured to prevent unauthorized domain access.
- **Google OAuth:** Secure third-party authentication flow avoiding password handling.

--------------------------------------------------

## 🔌 API Capabilities

**Authentication:**
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate with email/password
- `POST /api/auth/google` - Authenticate via Google OAuth
- `GET /api/auth/me` - Retrieve current user profile
- `POST /api/auth/logout` - Invalidate the current session

**Code Operations (AI):**
- `POST /api/code/translate` - Translate code from one language to another
- `POST /api/code/analyze` - Analyze code for complexity and best practices
- `POST /api/code/optimize` - Refactor and optimize code snippets
- `POST /api/code/explain` - Generate a detailed explanation of code
- `POST /api/code/debug` - Identify errors and provide fixed code
- `POST /api/code/execute` - Execute code safely

**User History:**
- `GET /api/history/` - Fetch user's code operation history
- `DELETE /api/history/:id` - Delete a specific history record
- `DELETE /api/history/clear` - Clear all user history

--------------------------------------------------

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API Key
- Google OAuth Client ID

### Clone
```bash
git clone https://github.com/divyapatelgm/smart-code-translater.git
cd smart-code-translater
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

--------------------------------------------------

## ☁️ Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/) (https://smart-code-translater-nine.vercel.app/)
- **Backend:** Deployed on [Render](https://render.com/) (https://smart-code-translater-gax1.onrender.com/)
- **Database:** Hosted on [MongoDB Atlas](https://www.mongodb.com/atlas)

--------------------------------------------------

## 📚 Documentation

Detailed documentation and architectural decisions can be found in [`DETAILED_README.md`](./DETAILED_README.md).

--------------------------------------------------

## 👨💻 Author
**Divya GM**