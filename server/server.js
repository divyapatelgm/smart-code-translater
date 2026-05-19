import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

/* We first connect to MongoDB (and wait until connected), then start listening for HTTP requests. 
import "dotenv/config" loads the .env file before anything else uses the environment variables. */


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Allowed Client URL: ${process.env.CLIENT_URL || "NOT SET"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
