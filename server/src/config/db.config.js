import mongoose from "mongoose";

/* mongoose.connect() establishes a connection to the MongoDB database using the URI from our .env file. 
If the connection fails, process.exit(1) stops the server — because without a database, the app can't 
function. */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in your .env file");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;