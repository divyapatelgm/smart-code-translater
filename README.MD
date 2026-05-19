# 🚀 Smart Code Translator

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)
![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-orange?logo=google)

An enterprise-grade, AI-powered full-stack web application that allows users to translate, analyze, optimize, and explain code across multiple programming languages.

---

## 📋 Table of Contents
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Data Flow](#-data-flow)
- [Setup & Installation](#-setup--installation)
- [Core API Endpoints](#-core-api-endpoints)

---

## 🏗️ Architecture & Tech Stack

This project follows a modern decoupled Client-Server architecture.

### Frontend (Client)
- **Framework:** React + Vite
- **Routing:** React Router v6
- **Editor:** Monaco Editor (VS Code core)
- **State Management:** React Context API
- **HTTP Client:** Axios

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & Google OAuth
- **AI Integration:** Google Gemini API (`@google/genai`)

---

## 📂 Project Structure

```text
smart-code-translater/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application routes
│   │   ├── services/       # API integration
│   │   └── context/        # State management
│   └── package.json
└── server/                 # Backend Node.js/Express App
    ├── src/
    │   ├── controllers/    # Business logic
    │   ├── routes/         # Express routes
    │   ├── models/         # Mongoose schemas
    │   └── services/       # AI & External integrations
    └── package.json
```

---

## 🔄 Data Flow

1. **User Interaction:** Input code in Monaco editor.
2. **Client Request:** Axios sends securely authenticated request to backend.
3. **Controller Processing:** Request verified by JWT middleware.
4. **AI Integration:** Backend constructs prompt and queries Gemini API.
5. **Persistence:** Results saved to MongoDB.
6. **Response:** Translated/optimized code displayed to user.

---

## 🚀 Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB
- Google Gemini API Key

### 2. Clone & Install
```bash
git clone https://github.com/divyapatelgm/smart-code-translater.git
cd smart-code-translater
```

### 3. Backend Setup
```bash
cd server
npm install
```
Create `.env` in `/server`:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/smartcode
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
```
Run Server: `npm run dev`

### 4. Frontend Setup
```bash
cd client
npm install
```
Create `.env` in `/client`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```
Run Client: `npm run dev`

---

## 🔌 Core API Endpoints

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login to account
- `POST /api/code/translate` - Translate code
- `POST /api/code/analyze` - Analyze complexity
- `POST /api/code/optimize` - Refactor code
- `POST /api/code/explain` - Explain code

---

## 👨‍💻 Author
**Divya GM**