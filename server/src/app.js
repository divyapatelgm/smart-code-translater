import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

// Allow our React frontend to talk to this backend
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy violation"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Convert incoming JSON requests to JavaScript objects
app.use(express.json());

// Mount all API routes under /api
app.use("/api", routes);

// Handle errors
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

/* express.json() is middleware that automatically parses JSON request bodies. Without it, req.body would be
undefined when the frontend sends JSON data.
app.use('/api', routes) mounts the route registry from Step 9 at /api. So authRoutes at /auth becomes 
/api/auth/... in the final URL. */