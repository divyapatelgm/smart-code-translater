import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

/* We first connect to MongoDB (and wait until connected), then start listening for HTTP requests. 
import "dotenv/config" loads the .env file before anything else uses the environment variables. */


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Render explicitly requires 0.0.0.0 to expose the port. Locally, we leave it undefined to support IPv4/IPv6 automatically.
    const host = (process.env.RENDER || process.env.NODE_ENV === 'production') ? '0.0.0.0' : undefined;
    app.listen(PORT, host, () => {
      console.log(`Server is running on port ${PORT} (Host: ${host || 'default'})`);
      console.log(`Allowed Client URL: ${process.env.CLIENT_URL || "NOT SET"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
