import mongoose from "mongoose";

const FALLBACK_MONGO_URI = "mongodb://127.0.0.1:27017/smartcode";

/* mongoose.connect() establishes a connection to the MongoDB database using the URI from our .env file.
If the configured URI is unavailable, the server falls back to a local MongoDB instance so it can still start. */
const connectDB = async () => {
  try {
    const configuredURI = process.env.MONGODB_URI;
    const mongoURI = configuredURI || FALLBACK_MONGO_URI;

    if (!configuredURI) {
      console.warn(`MONGODB_URI is not defined; using fallback URI ${FALLBACK_MONGO_URI}`);
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (process.env.MONGODB_URI && process.env.MONGODB_URI !== FALLBACK_MONGO_URI) {
      console.warn(`Primary MongoDB connection failed: ${error.message}. Retrying with fallback URI ${FALLBACK_MONGO_URI}`);
      try {
        const conn = await mongoose.connect(FALLBACK_MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`MongoDB Connection Error: ${fallbackError.message}`);
        process.exit(1);
      }
    }

    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;