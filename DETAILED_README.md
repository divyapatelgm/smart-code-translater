# 🚀 Smart Code Translator (Detailed Documentation)

<div align="center">
  <p>An enterprise-grade, AI-powered full-stack web application that allows users to translate, analyze, optimize, and explain code across multiple programming languages using Google Gemini.</p>
</div>

---

## 🏗️ Architecture & Tech Stack

This project follows a modern decoupled Client-Server architecture, utilizing a React-based frontend and a Node.js/Express backend, backed by MongoDB for persistence and Google's Gemini API for AI code operations.

### Frontend (Client)
- **Framework:** React (bootstrapped with Vite for optimized builds)
- **Routing:** React Router v6
- **Editor:** Monaco Editor (VS Code core)
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Styling:** CSS / Modules
- **UI Notifications:** React Hot Toast

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & Google OAuth
- **AI Integration:** Google Gemini API (`@google/genai`)

---

## 📂 Project Structure & File Explanations

The repository is organized as a monorepo containing both the frontend client and the backend server.

```text
smart-code-translater/
├── client/                 # Frontend React Application
├── server/                 # Backend Node.js/Express Application
├── .gitignore              # Files to ignore in version control
└── README.md               # Project documentation
```

### 💻 Client Directory (`/client`)

The frontend is a Vite-powered React application.

```text
client/
├── public/                 # Static assets (favicon, images) served at root
├── src/                    # Main source code directory
│   ├── assets/             # Images, SVGs, and other media used in components
│   ├── components/         # Reusable React components
│   │   ├── AIInsightsSidebar.jsx # Sidebar for AI analysis and explanations
│   │   ├── CodeEditor.jsx        # Monaco editor wrapper for code input
│   │   ├── ExecutionConsole.jsx  # Console to display code execution results
│   │   ├── Layout.jsx            # Main app layout wrapper
│   │   ├── LogicStepper.jsx      # UI component for step-by-step logic display
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── OutputPanel.jsx       # Displays translated or optimized code output
│   │   └── ProtectedRoute.jsx    # HOC to guard routes requiring authentication
│   ├── constants/          # Application-wide constants (e.g., supported languages)
│   ├── context/            # React Contexts for global state management (Auth, Theme)
│   ├── pages/              # Top-level route components
│   │   ├── Dashboard.jsx         # Main landing/dashboard page after login
│   │   ├── EditorPage.jsx        # Core workspace for translating/analyzing code
│   │   ├── HistoryPage.jsx       # User's operation history and saved snippets
│   │   └── LoginPage.jsx         # Authentication page (Email & Google OAuth)
│   ├── services/           # API service modules (Axios instances and API calls)
│   ├── styles/             # Global CSS and modular stylesheets
│   ├── App.jsx             # Root React component defining routes
│   ├── App.css, index.css  # Global stylesheets
│   └── main.jsx            # React application entry point and DOM rendering
├── .env                    # Environment variables (API URLs, Client IDs)
├── eslint.config.js        # Linter configuration for code quality
├── package.json            # Frontend dependencies and scripts
└── vite.config.js          # Vite bundler configuration
```

### ⚙️ Server Directory (`/server`)

The backend is a RESTful API built with Express.js and structured following MVC (Model-View-Controller) principles.

```text
server/
├── src/                    # Backend source code
│   ├── config/             # Configuration files (Database connection, Passport setup)
│   ├── constants/          # Shared backend constants (Error codes, API limits)
│   ├── controllers/        # Request handlers (Business logic layer)
│   │   ├── auth.controller.js    # Registration, login, and token generation
│   │   ├── code.controller.js    # Code translation, analysis, and optimization handlers
│   │   └── history.controller.js # Fetching, deleting, and managing user history
│   ├── middleware/         # Express middlewares
│   │   ├── auth.middleware.js    # JWT verification and route protection
│   │   └── error.middleware.js   # Global error handling and formatting
│   ├── models/             # Mongoose schemas (Data access layer)
│   │   ├── User.js               # User schema (email, password hash, OAuth ID)
│   │   └── History.js            # History schema for storing AI interactions
│   ├── routes/             # API route definitions
│   │   ├── auth.routes.js        # Routes for authentication (/api/auth)
│   │   ├── code.routes.js        # Routes for AI code operations (/api/code)
│   │   ├── history.routes.js     # Routes for managing history (/api/history)
│   │   └── index.js              # Main API router aggregating all route modules
│   ├── services/           # Complex business logic and external integrations
│   │   └── gemini.service.js     # Integration with Google Gemini API
│   ├── utils/              # Helper functions (Hash passwords, generate tokens)
│   └── app.js              # Express app initialization and middleware setup
├── server.js               # Application entry point (Starts the HTTP server)
├── .env                    # Environment variables (DB URI, Secrets, API Keys)
└── package.json            # Backend dependencies and scripts
```

---

## 🔄 Data & Request Flow

1. **User Interaction:** The user inputs code in the `CodeEditor.jsx` on the `EditorPage.jsx` and clicks an action (e.g., Translate).
2. **Client Request:** A service method in `client/services` makes a secure REST HTTP request to the backend.
3. **Authentication:** The request passes through `auth.middleware.js` to verify the user's JWT.
4. **Controller Processing:** `code.controller.js` receives the payload and passes it to the AI service.
5. **AI Integration:** `gemini.service.js` constructs a structured prompt and communicates with the Google Gemini API.
6. **Data Persistence:** The operation and its result are asynchronously saved to MongoDB via the `History` model.
7. **Client Response:** The formatted result is sent back to the client and rendered in the `OutputPanel.jsx` or `AIInsightsSidebar.jsx`.

---

## 🚀 Setup & Installation

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or MongoDB Atlas)
- Google Gemini API Key

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/smart-code-translater.git
cd smart-code-translater
```

### 3. Backend Setup
Navigate to the server directory, install dependencies, and set up environment variables.
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/smartcode
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
```
Start the development server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a new terminal, navigate to the client directory, install dependencies, and configure the environment.
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```
Start the frontend development server:
```bash
npm run dev
```

---

## 🔌 Core API Endpoints

### 🔐 Authentication (`/api/auth`)
- `POST /register` - Create a new user account
- `POST /login` - Authenticate user and return JWT
- `POST /google` - Authenticate via Google OAuth
- `GET /me` - Get current user profile (Protected)

### 🤖 Code Operations (`/api/code`)
*All endpoints are protected and require a valid JWT.*
- `POST /translate` - Translate code to a target language
- `POST /analyze` - Calculate time/space complexity
- `POST /optimize` - Refactor code for better performance
- `POST /explain` - Generate a beginner-friendly explanation

### 📜 History (`/api/history`)
*All endpoints are protected and require a valid JWT.*
- `GET /` - Fetch paginated user history
- `DELETE /:id` - Delete a specific history entry
- `DELETE /clear` - Clear all history for the user

---

## 👨‍💻 Author
**Divya GM**

## 📄 License
This project is intended for educational purposes and internal tooling.
